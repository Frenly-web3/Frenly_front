import type { IPost } from '@entities/post'
import React, { useContext } from 'react'

interface IPostCardContext extends IPost {
  creatorAvatar: string | null
  creatorUsername: string | null
  fromMirrorName: string | null
  isLoading: boolean
}

export const PostCardContext = React.createContext<IPostCardContext | undefined>(
  undefined
)

export const PostCardContextProvider = () => {}

export const usePostCardContext = () => {
  const postCardContext = useContext(PostCardContext)

  if (!postCardContext) {
    throw new Error('Post card context not exist')
  }

  return postCardContext
}
