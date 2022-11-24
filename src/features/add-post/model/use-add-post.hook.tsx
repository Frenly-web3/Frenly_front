import { UserModelService } from '@entities/user'
import {
  adminApi,
  contentApi,
  // useCreatePostTypedData,
  useCreatePostViaDispatcher,
} from '@shared/api'
import {
  RoleEnum,
  useConvertResponseToPublicationId,
  useLoaderContext,
  useWaitTxInfo,
} from '@shared/lib'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import {
  useBlockchain,
  useGetWalletProfileId,
  // usePostWithSig,
  // useSignTypedData,
  // useSplitSignature,
} from 'src/blockchain'

interface IAddPost {
  backId: number
}

export const useAddPost = ({ backId }: IAddPost) => {
  const { setIsLoading } = useLoaderContext()

  const { account } = useBlockchain()

  const viewerProfileId = useGetWalletProfileId(account as string)

  // const splitSignature = useSplitSignature()
  // const signTypedData = useSignTypedData()

  const { user } = UserModelService.useUserInfo({ profileId: viewerProfileId })

  const [getAdminPostMetadata] = adminApi.useLazyGetPostMetadataQuery()
  const [getUserPostMetadata] = contentApi.useLazyGetContentMetadataQuery()

  const [removeAdminContent] = adminApi.useRemoveContentMutation()
  const [removeContent] = contentApi.useRemoveContentMutation()

  // const { createPostTypedData } = useCreatePostTypedData()
  const { createPostViaDispatcher } = useCreatePostViaDispatcher()

  // const { send: postWithSig } = usePostWithSig()

  const [publishAdminPost] = adminApi.usePublishPostMutation()
  const [publishUserPost] = contentApi.usePublishContentMutation()

  const convertTxToPublicationId = useConvertResponseToPublicationId()

  const [bindAdminContent] = adminApi.useBindPostWithLensMutation()
  const [bindUserContent] = contentApi.useBindWithLensIdMutation()

  const { pollUntilIndexed } = useWaitTxInfo()

  // const addPost = useCallback(async () => {
  //   const isAdmin = user.role == RoleEnum.Admin
  //   try {
  //     setIsLoading(true)
  //     const contentMetadata = await (isAdmin
  //       ? getAdminPostMetadata({ contentId: backId.toString() })
  //       : getUserPostMetadata({ contentId: backId.toString() }))
  //     const result = await createPostTypedData({
  //       contentURI: contentMetadata?.data,
  //       profileId: viewerProfileId,
  //     })

  //     const typedData = result?.data?.createPostTypedData?.typedData

  //     const signature = await signTypedData({ typedData })

  //     const { v, r, s } = await splitSignature({ signature: signature as string })

  //     const { deadline, ...omitTypedData } = typedData.value

  //     const tx = await postWithSig({
  //       ...omitTypedData,
  //       sig: {
  //         v,
  //         r,
  //         s,
  //         deadline,
  //       },
  //     })

  //     const newLensId = convertTxToPublicationId({ tx })

  //     await (isAdmin
  //       ? publishAdminPost({ contentId: backId.toString() })
  //       : publishUserPost({
  //           contentId: backId.toString(),
  //         }))

  //     const bindArguments = {
  //       contentId: backId.toString(),
  //       lensId: newLensId,
  //     }

  //     await (isAdmin ? bindAdminContent(bindArguments) : bindUserContent(bindArguments))

  //     toast.success('You successfully created post.', { icon: '💫' })
  //   } catch (error_) {
  //     console.log(error_)
  //     toast.error('Something went wrong. Try again.', {
  //       icon: '😢',
  //     })
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }, [backId, user.role])

  const addPost = useCallback(async () => {
    const isAdmin = user.role == RoleEnum.Admin
    try {
      setIsLoading(true)
      const contentMetadata = await (isAdmin
        ? getAdminPostMetadata({ contentId: backId.toString() })
        : getUserPostMetadata({ contentId: backId.toString() }))
      const response = await createPostViaDispatcher({
        contentURI: contentMetadata?.data,
        profileId: viewerProfileId,
      })

      const tx = await pollUntilIndexed({
        txId: response?.data?.createPostViaDispatcher?.txId,
      })
      const newLensId = convertTxToPublicationId({ tx })

      if (newLensId == '0xNaN-0xNaN') {
        throw new Error('Incorrect new lens id')
      }

      await (isAdmin
        ? publishAdminPost({ contentId: backId.toString() })
        : publishUserPost({
            contentId: backId.toString(),
          }))

      const bindArguments = {
        contentId: backId.toString(),
        lensId: newLensId,
      }

      await (isAdmin ? bindAdminContent(bindArguments) : bindUserContent(bindArguments))

      toast.success('You successfully created post.', { icon: '💫' })
    } catch (error_) {
      console.log(error_)
      toast.error('Something went wrong. Try again.', {
        icon: '😢',
      })
    } finally {
      setIsLoading(false)
    }
  }, [backId, user.role])

  const declinePost = useCallback(async () => {
    try {
      setIsLoading(true)
      await (user.role === RoleEnum.Admin
        ? removeAdminContent({ contentId: backId.toString() }).unwrap()
        : removeContent({ contentId: backId.toString() }).unwrap())
      toast.success('You successfully declined post.', { icon: '❌' })
    } catch (error_) {
      // toast.error(String(error_))
      console.log(error_)
      toast.error('Something went wrong. Try again.', {
        icon: '😢',
      })
    } finally {
      setIsLoading(false)
    }
  }, [backId, user.role])
  return {
    addPost,
    declinePost,
  }
}
