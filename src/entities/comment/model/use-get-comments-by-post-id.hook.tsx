import { useGetLensComments } from '@shared/api'
import { useMemo, useState } from 'react'

import type { IComment } from './comment.entity'

export const useGetCommentsByPostId = ({ publicationId }: { publicationId: string }) => {
  const { data: lensComments, refetch: refetchLensComments } = useGetLensComments({
    publicationId,
  })
  // const [getUserInfo] = userApi.useLazyGetUserInfoQuery()
  const [commentValue, setCommentValue] = useState('')
  return useMemo(() => {
    const comments = lensComments?.publications?.items?.map((comment: any): IComment => {
      return {
        createdAt: comment?.createdAt,
        description: comment?.metadata?.description,
        profileId: comment?.profile?.id,
        address: comment?.profile?.ownedBy,
      }
    })

    return {
      comments,
      commentValue,
      setCommentValue,
      refetchLensComments,
    }
  }, [commentValue, lensComments?.publications?.items, refetchLensComments])
}
