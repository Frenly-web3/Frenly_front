import type { IComment } from '@entities/comment'
import { reactionsApi } from '@shared/api'
import React from 'react'
import { useAccount } from 'wagmi'

interface IProperties {
  postId: number
}

export const usePostComment = (props: IProperties) => {
  const { postId } = props
  const { address } = useAccount()
  const { data: reactions, isError: reactionsError } = reactionsApi.usePostReactionsQuery(
    { postId }
  )
  const [commentMutation, { isError: mutationError }] =
    reactionsApi.useCreateCommentMutation()
  const [comments, setComments] = React.useState<IComment[]>([])

  React.useEffect(() => {
    if (reactions) setComments(reactions.comments)
  }, [reactions])

  const addComment = (description: string) => {
    setComments((previous) =>
      previous.concat({
        creationDate: new Date(),
        description,
        updateDate: new Date(),
        creator: {
          walletAddress: address!,
        },
      })
    )
    commentMutation({ comment: description, postId })
  }

  return {
    addComment,
    comments,
    isError: {
      reactions: reactionsError,
      mutation: mutationError,
    },
  }
}
