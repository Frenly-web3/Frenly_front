import { contentApi, useGetPublicationsStats } from '@shared/api'
import { useConvertResponseToPublicationId } from '@shared/lib'
import { useCallback, useState } from 'react'
import {
  useBlockchain,
  useGetWalletProfileId,
  useMirrorWithSig,
  useSignTypedData,
  useSplitSignature,
} from 'src/blockchain'

import { mirrorPostMutation } from '../api'

interface IUseMirrorPost {
  publicationId: string
  refetchFilteredFeed: () => void
}
export function useMirrorPost({ publicationId, refetchFilteredFeed }: IUseMirrorPost) {
  const { account } = useBlockchain()

  const viewerProfileLensId = useGetWalletProfileId(account as string)
  const signTypedData = useSignTypedData()
  const splitSignature = useSplitSignature()
  const { send: mirrorWithSig } = useMirrorWithSig()

  const { data: publicationStats, refetch: refetchPublicationsStats } =
    useGetPublicationsStats({ publicationId })
  const convertTxToPublicationId = useConvertResponseToPublicationId()
  const [mirrorPostBack] = contentApi.useMirrorPostMutation()

  const [descriptionMirror, setDescriptionMirror] = useState('')
  const [isShowDescription, setIsShowDescription] = useState(false)

  const mirrorPost = useCallback(async () => {
    try {
      const typedDataResponse = await mirrorPostMutation({
        publicationId,
        viewerProfileLensId,
      })

      const typedData = typedDataResponse?.data?.createMirrorTypedData?.typedData

      const signature = await signTypedData({ typedData })

      const { v, r, s } = await splitSignature({ signature: signature as string })

      const { deadline, ...omitTypedData } = typedData.value

      const tx = await mirrorWithSig({
        ...omitTypedData,
        sig: {
          v,
          r,
          s,
          deadline,
        },
      })

      const newLensId = convertTxToPublicationId({ tx })
      console.log(newLensId)

      await mirrorPostBack({
        lensId: publicationId as string,
        newLensId,
        description: descriptionMirror,
      }).unwrap()
    } catch (error) {
      console.log(error)
    } finally {
      await refetchPublicationsStats()
      refetchFilteredFeed()
      setIsShowDescription(false)
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
