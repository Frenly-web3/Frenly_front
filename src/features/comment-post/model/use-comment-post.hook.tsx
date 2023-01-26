import {
  contentApi,
  // useCreateCommentTypedData,
  useCreateCommentViaDispatcher,
  useGetPublicationsStats,
} from '@shared/api'
import { useDispatcherLensContext, useLoaderContext } from '@shared/lib'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import {
  useBlockchain,
  // useCommentWithSig,
  useGetWalletProfileId,
  // useSignTypedData,
  // useSplitSignature,
} from 'src/blockchain'

export function useCommentPost({
  publicationId,
  setComments,
}: {
  publicationId: string
  setComments?: ({ content }: { content: string }) => void
}) {
  const { setIsShow } = useDispatcherLensContext()
  const [commentValue, setCommentValue] = useState('')
  const { account } = useBlockchain()
  // const splitSignature = useSplitSignature()
  // const signTypeData = useSignTypedData()
  const { setIsLoading } = useLoaderContext()
  const [amountComments, setAmountComments] = useState<number>(0)
  const viewerProfileId = useGetWalletProfileId(account as string)

  const { data: publicationStats } = useGetPublicationsStats({ publicationId })
  // const { createCommentTypedData } = useCreateCommentTypedData()
  const { createCommentViaDispatcher } = useCreateCommentViaDispatcher()
  // const { send: commentWithSig } = useCommentWithSig()
  const [getCommentMetadata] = contentApi.useLazyGetCommentMetadataQuery()

  useEffect(() => {
    setAmountComments(publicationStats?.publication?.stats?.totalAmountOfComments)
  }, [publicationStats])

  const commentPost = useCallback(
    async ({ comment }: { comment: string }) => {
      if (!setComments) {
        return
      }
      try {
        setIsLoading(true)
        const { data: commentMetadata } = await getCommentMetadata({
          comment,
          lensId: publicationId,
        })

        const resp = await createCommentViaDispatcher({
          profileId: viewerProfileId,
          contentURI: commentMetadata,
          publicationId,
        })

        if (resp?.data?.createCommentViaDispatcher?.reason === 'REJECTED') {
          setIsShow(true)
          throw new Error('Dispatcher not exist')
        }

        setComments({ content: comment })
        setAmountComments((previous) => previous + 1)
        setCommentValue('')
        toast.success('Post was successfully commented.', { icon: '💫' })
      } catch (error) {
        // @ts-ignore
        if (error.message == 'Dispatcher not exist') {
          toast.warn('Approve create dispatcher and try again', {
            icon: '😊',
          })
        } else {
          toast.error('Something went wrong. Try again.', {
            icon: '😢',
          })
        }
      } finally {
        setIsLoading(false)
      }
    },
    [publicationId, viewerProfileId, amountComments]
    // const commentPost = useCallback(
    //   async ({ comment }: { comment: string }) => {
    //     if (!setComments) {
    //       return
    //     }
    //     try {
    //       setIsLoading(true)
    //       const { data: commentMetadata } = await getCommentMetadata({
    //         comment,
    //         lensId: publicationId,
    //       })

    //       const result = await createCommentTypedData({
    //         profileId: viewerProfileId,
    //         contentURI: commentMetadata,
    //         publicationId,
    //       })
    //       const typedData = result?.data?.createCommentTypedData?.typedData

    //       const signature = await signTypeData({ typedData })
    //       const { v, r, s } = await splitSignature({ signature: signature as string })

    //       const { deadline, ...omitTypedData } = typedData.value

    //       await commentWithSig({
    //         ...omitTypedData,
    //         sig: {
    //           v,
    //           r,
    //           s,
    //           deadline,
    //         },
    //       })

    //       setComments({ content: comment })
    //       setAmountComments((previous) => previous + 1)
    //       setCommentValue('')
    //       toast.success('Post was successfully commented.', { icon: '💫' })
    //     } catch {
    //       toast.error('Something went wrong. Try again.', {
    //         icon: '😢',
    //       })
    //     } finally {
    //       setIsLoading(false)
    //     }
    //   },
    //   [publicationId, viewerProfileId, amountComments]
  )

  return useMemo(
    () => ({
      commentPost,
      comment: commentValue,
      setComment: setCommentValue,
      amountComments: amountComments as number,
    }),
    [commentPost, commentValue, amountComments]
  )
}
