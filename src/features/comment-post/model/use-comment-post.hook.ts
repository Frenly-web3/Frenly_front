import {
  contentApi,
  useCreateCommentTypedData,
  useGetPublicationsStats,
} from '@shared/api'
import { useLoaderContext } from '@shared/lib'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useBlockchain,
  useCommentWithSig,
  useGetWalletProfileId,
  useSignTypedData,
  useSplitSignature,
} from 'src/blockchain'

export function useCommentPost({
  publicationId,
  setComments,
}: {
  publicationId: string
  setComments?: ({ content }: { content: string }) => void
}) {
  const [commentValue, setCommentValue] = useState('')
  const { account } = useBlockchain()
  const splitSignature = useSplitSignature()
  const signTypeData = useSignTypedData()
  const { setIsLoading } = useLoaderContext()
  const [amountComments, setAmountComments] = useState<number>(0)
  const viewerProfileId = useGetWalletProfileId(account as string)

  const { data: publicationStats } = useGetPublicationsStats({ publicationId })
  const { createCommentTypedData } = useCreateCommentTypedData()
  const { send: commentWithSig } = useCommentWithSig()
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

        const result = await createCommentTypedData({
          profileId: viewerProfileId,
          contentURI: commentMetadata,
          publicationId,
        })
        const typedData = result?.data?.createCommentTypedData?.typedData

        const signature = await signTypeData({ typedData })
        console.log(signature)

        const { v, r, s } = await splitSignature({ signature: signature as string })

        await commentWithSig({
          profileId: typedData.value.profileId,
          contentURI: typedData.value.contentURI,
          profileIdPointed: typedData.value.profileIdPointed,
          pubIdPointed: typedData.value.pubIdPointed,
          referenceModuleData: typedData.value.referenceModuleData,
          collectModule: typedData.value.collectModule,
          collectModuleInitData: typedData.value.collectModuleInitData,
          referenceModule: typedData.value.referenceModule,
          referenceModuleInitData: typedData.value.referenceModuleInitData,
          sig: {
            v,
            r,
            s,
            deadline: typedData.value.deadline,
          },
        })

        setComments({ content: comment })
        setAmountComments((previous) => previous + 1)
        setCommentValue('')
      } catch {
      } finally {
        setIsLoading(false)
      }
    },
    [publicationId, viewerProfileId, amountComments]
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
