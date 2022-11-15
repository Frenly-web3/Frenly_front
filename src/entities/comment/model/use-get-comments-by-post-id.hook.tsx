import { useGetLensComments } from '@shared/api'
import { useMemo, useState } from 'react'
import { useBlockchain, useGetWalletProfileId } from 'src/blockchain'

import type { IComment } from './comment.entity'

export const useGetCommentsByPostId = ({ publicationId }: { publicationId: string }) => {
  const { data: lensComments, refetch: refetchLensComments } = useGetLensComments({
    publicationId,
  })

  const { account } = useBlockchain()

  const viewerProfileLensId = useGetWalletProfileId(account as string)

  const [commentsValue, setCommentsValue] = useState<IComment[]>([])

  const addMockComment = ({ content }: { content: string }) => {
    const mockComment: IComment = {
      createdAt: new Date().toISOString(),
      description: content,
      profileId: viewerProfileLensId,
      address: account as string,
    }
    if (commentsValue.length === 0) {
      setCommentsValue([mockComment])
    } else {
      setCommentsValue((previous) => [...previous, mockComment])
    }
  }

  useMemo(() => {
    const comments = lensComments?.publications?.items?.map((comment: any): IComment => {
      return {
        createdAt: comment?.createdAt,
        description: comment?.metadata?.content,
        profileId: comment?.profile?.id,
        address: comment?.profile?.ownedBy,
      }
    })
    setCommentsValue(comments?.reverse())
  }, [lensComments?.publications?.items])

  return {
    comments: commentsValue,
    refetchLensComments,
    setCommentsValue: addMockComment,
  }
}
