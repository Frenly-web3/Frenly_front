import { useGetPublicationsStats } from '@shared/api'
import { useCallback, useEffect, useState } from 'react'
import { useBlockchain, useGetWalletProfileId } from 'src/blockchain'

import { likePostLens, unlikePostLens, useGetIsReact } from '../api'

export function useLikePost({ publicationId }: { publicationId: string }) {
  const [isLiking, setIsLiking] = useState(false)
  const { account } = useBlockchain()
  const [amountLikes, setAmountLike] = useState<number>(0)
  const [liked, setLiked] = useState<boolean>(false)

  const viewerProfileLensId = useGetWalletProfileId(account as string)

  const { data: isReact } = useGetIsReact({
    publicationId,
    viewerProfileLensId,
  })

  const { data: publicationStats } = useGetPublicationsStats({ publicationId })

  useEffect(() => {
    setAmountLike(publicationStats?.publication?.stats?.totalUpvotes)
    setLiked(isReact?.publications?.items[0]?.reaction !== null)
  }, [publicationStats, isReact])

  const likeUnlikePost = useCallback(async () => {
    // await refetchIsReact()
    setIsLiking(true)
    // setIsLoading(true)

    try {
      if (!liked) {
        setAmountLike((previous) => previous + 1)
        setLiked(true)
        await likePostLens({ publicationId, viewerProfileLensId })
      } else {
        setAmountLike((previous) => previous - 1)
        setLiked(false)
        await unlikePostLens({ publicationId, viewerProfileLensId })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLiking(false)
    }
  }, [liked, publicationId, viewerProfileLensId])

  return {
    isLiking,
    likeUnlikePost,
    amountLikes,
    liked,
  }
}
