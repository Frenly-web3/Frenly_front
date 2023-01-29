import type { IPost } from '@entities/post'
import React, { memo } from 'react'

import { PostCardContext } from '../model'
import { PostCardAuthor } from './post-card-author.component'
import { PostCardContent } from './post-card-content.component'
import { PostCardImage } from './post-card-image.component'
import { PostCardReactions } from './post-card-reactions.component'

interface IPostCardProperties extends IPost {
  children: React.ReactNode
}

export const PostCard = (props: IPostCardProperties) => {
  const { children } = props

  const value = React.useMemo(
    () => ({
      ...props,
    }),
    [props]
  )

  return (
    <PostCardContext.Provider value={value}>
      <article className="bg-background mb-4 py-4 rounded-[2rem] px-0">
        {children}
      </article>
    </PostCardContext.Provider>
  )
}

PostCard.Author = memo(PostCardAuthor)
PostCard.Content = memo(PostCardContent)
PostCard.Reactions = memo(PostCardReactions)
PostCard.Image = memo(PostCardImage)
