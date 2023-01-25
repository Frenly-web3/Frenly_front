import type { IComment } from '@entities/comment'
import React, { useContext } from 'react'

interface IPostReactionContext {
  comments: {
    addComment: (description: string) => void
    comments: IComment[]
    isError: {
      reactions: boolean
      mutation: boolean
    }
  }
  likes: {
    isError: {
      reactions: boolean
      isLiked: boolean
      mutation: boolean
    }
    isLiked: boolean
    likeUnlike: () => void
    count: number
  }
}
export const PostReactionContext = React.createContext<IPostReactionContext | null>(null)

export const usePostReactionContext = () => {
  const context = useContext(PostReactionContext)

  if (!PostReactionContext) {
    throw new Error('Post reaction context not exist')
  }

  return context
}
