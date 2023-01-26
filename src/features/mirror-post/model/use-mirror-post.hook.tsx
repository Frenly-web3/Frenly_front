import {
  contentApi,
  useGetPublicationsStats,
  useMirrorPostViaDispatcher,
} from '@shared/api'
import {
  useConvertResponseToPublicationId,
  useDispatcherLensContext,
  useLoaderContext,
  useWaitTxInfo,
} from '@shared/lib'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import {
  useBlockchain,
  useGetWalletProfileId,
  // useMirrorWithSig,
  // useSignTypedData,
  // useSplitSignature,
} from 'src/blockchain'

interface IUseMirrorPost {
  publicationId: string
  refetchFilteredFeed: () => void
}
export function useMirrorPost({ publicationId, refetchFilteredFeed }: IUseMirrorPost) {
  const { account } = useBlockchain()
  const { setIsLoading } = useLoaderContext()
  const viewerProfileLensId = useGetWalletProfileId(account as string)
  // const signTypedData = useSignTypedData()
  // const splitSignature = useSplitSignature()
  // const { send: mirrorWithSig } = useMirrorWithSig()
  const { setIsShow } = useDispatcherLensContext()
  const { mirrorPostViaDispatcher } = useMirrorPostViaDispatcher()

  const { data: publicationStats, refetch: refetchPublicationsStats } =
    useGetPublicationsStats({ publicationId })
  const convertTxToPublicationId = useConvertResponseToPublicationId()
  const [mirrorPostBack] = contentApi.useMirrorPostMutation()

  const { pollUntilIndexed } = useWaitTxInfo()

  const [descriptionMirror, setDescriptionMirror] = useState('')
  const [isShowDescription, setIsShowDescription] = useState(false)

  // const mirrorPost = useCallback(async () => {
  //   try {
  //     setIsLoading(true)
  //     setIsShowDescription(false)
  //     const typedDataResponse = await mirrorPostMutation({
  //       publicationId,
  //       viewerProfileLensId,
  //     })

  //     const typedData = typedDataResponse?.data?.createMirrorTypedData?.typedData

  //     const signature = await signTypedData({ typedData })

  //     const { v, r, s } = await splitSignature({ signature: signature as string })

  //     const { deadline, ...omitTypedData } = typedData.value

  //     const tx = await mirrorWithSig({
  //       ...omitTypedData,
  //       sig: {
  //         v,
  //         r,
  //         s,
  //         deadline,
  //       },
  //     })

  //     const newLensId = convertTxToPublicationId({ tx })

  //     if (newLensId == '0xNaN-0xNaN') {
  //       throw new Error('Incorrect new lens id')
  //     }

  //     await mirrorPostBack({
  //       lensId: publicationId as string,
  //       newLensId,
  //       description: descriptionMirror,
  //     }).unwrap()
  //     toast.success('You successfully created mirror.', {
  //       icon: '✨',
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     await refetchPublicationsStats()
  //     refetchFilteredFeed()

  //     setIsLoading(false)
  //   }
  // }, [descriptionMirror, publicationId, viewerProfileLensId])

  const mirrorPost = useCallback(async () => {
    try {
      setIsLoading(true)
      setIsShowDescription(false)
      const response = await mirrorPostViaDispatcher({
        publicationId,
        profileId: viewerProfileLensId,
      })

      if (response?.data?.createMirrorViaDispatcher?.reason === 'REJECTED') {
        setIsShow(true)
        throw new Error('Dispatcher not exist')
      }

      const tx = await pollUntilIndexed({
        txId: response?.data?.createMirrorViaDispatcher?.txId,
      })
      const newLensId = convertTxToPublicationId({ tx })

      if (newLensId == '0xNaN-0xNaN') {
        throw new Error('Incorrect new lens id')
      }

      await mirrorPostBack({
        lensId: publicationId as string,
        newLensId,
        description: descriptionMirror,
      }).unwrap()
      toast.success('You successfully created mirror.', {
        icon: '✨',
      })
    } catch (error) {
      // @ts-ignore
      if (error.message == 'Dispatcher not exist') {
        toast.warn('Approve create dispatcher and try again', {
          icon: '😊',
        })
      }
      console.log(error)
    } finally {
      await refetchPublicationsStats()
      refetchFilteredFeed()

      setIsLoading(false)
    }
  }, [descriptionMirror, publicationId, viewerProfileLensId])

  return {
    amountMirrors: publicationStats?.publication?.stats?.totalAmountOfMirrors,
    mirrorPost,
    descriptionMirror,
    setDescriptionMirror,
    isShowDescription,
    setIsShowDescription,
  }
}
