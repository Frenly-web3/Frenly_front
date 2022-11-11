import { contentApi, useGetPublicationsStats } from '@shared/api'
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
}
export function useMirrorPost({ publicationId }: IUseMirrorPost) {
  const { account } = useBlockchain()

  const viewerProfileLensId = useGetWalletProfileId(account as string)
  const signTypedData = useSignTypedData()
  const splitSignature = useSplitSignature()
  const { send: mirrorWithSig } = useMirrorWithSig()

  const { data: publicationStats, refetch: refetchPublicationsStats } =
    useGetPublicationsStats({ publicationId })

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

      const tx = await mirrorWithSig({
        profileId: typedData.value.profileId,
        profileIdPointed: typedData.value.profileIdPointed,
        pubIdPointed: typedData.value.pubIdPointed,
        referenceModuleData: typedData.value.referenceModuleData,
        referenceModule: typedData.value.referenceModule,
        referenceModuleInitData: typedData.value.referenceModuleInitData,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      })

      const newLensId =
        Number(tx?.logs[0]?.topics[2]).toString(16).length === 1
          ? `0x${Number(tx?.logs[0]?.topics[1]).toString(16)}-0x0${Number(
              tx?.logs[0]?.topics[2]
            ).toString(16)}`
          : `0x${Number(tx?.logs[0]?.topics[1]).toString(16)}-0x${Number(
              tx?.logs[0]?.topics[2]
            ).toString(16)}`
      console.log(newLensId)

      await mirrorPostBack({
        lensId: publicationId as string,
        newLensId,
        description: descriptionMirror,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsShowDescription(false)
      await refetchPublicationsStats()
    }
  }, [
    descriptionMirror,
    mirrorPostBack,
    mirrorWithSig,
    publicationId,
    refetchPublicationsStats,
    signTypedData,
    splitSignature,
    viewerProfileLensId,
  ])

  return {
    amountMirrors: publicationStats?.publication?.stats?.totalAmountOfMirrors,
    mirrorPost,
    descriptionMirror,
    setDescriptionMirror,
    isShowDescription,
    setIsShowDescription,
  }
}
