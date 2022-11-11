import { useGetPublicationsStats } from '@shared/api'
import { useCallback } from 'react'

export function useCommentPost({ publicationId }: { publicationId: string }) {
  const { data: publicationStats } = useGetPublicationsStats({ publicationId })

  const commentPost = useCallback(async () => {}, [])

  return {
    commentPost,
    amountComments: publicationStats?.publication?.stats?.totalAmountOfComments,
  }
}
