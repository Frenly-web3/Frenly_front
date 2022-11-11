import { useGetPublicationsStats } from '@shared/api'
import { useLoaderContext } from '@shared/lib'
import { useCallback, useState } from 'react'
import { useBlockchain, useGetWalletProfileId } from 'src/blockchain'

import { likePostLens, unlikePostLens, useGetIsReact } from '../api'

export function useLikePost({ publicationId }: { publicationId: string }) {
  const [isLiking, setIsLiking] = useState(false)
  const { setIsLoading } = useLoaderContext()
  const { account } = useBlockchain()

  const viewerProfileLensId = useGetWalletProfileId(account as string)

  const { data: isReact, refetch: refetchIsReact } = useGetIsReact({
    publicationId,
    viewerProfileLensId,
  })

  const { data: publicationStats, refetch: refetchPublicationsStats } =
    useGetPublicationsStats({ publicationId })

  const likeUnlikePost = useCallback(async () => {
    await refetchIsReact()
    setIsLiking(true)
    setIsLoading(true)
    try {
      if (isReact?.publications?.items[0]?.reaction == null) {
        await likePostLens({ publicationId, viewerProfileLensId })
      } else if (isReact?.publications?.items[0]?.reaction == 'UPVOTE') {
        await unlikePostLens({ publicationId, viewerProfileLensId })
      }
    } catch (error) {
      console.error(error)
    } finally {
      await refetchPublicationsStats()
      await refetchIsReact()
      setIsLiking(false)
      setIsLoading(false)
    }
  }, [
    isReact?.publications?.items,
    publicationId,
    refetchIsReact,
    refetchPublicationsStats,
    viewerProfileLensId,
  ])

  return {
    isLiking,
    likeUnlikePost,
    amountLikes: publicationStats?.publication?.stats?.totalUpvotes,
  }
}
