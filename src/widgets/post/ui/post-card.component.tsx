import type { IPost } from '@entities/post'
import { UserModelService } from '@entities/user'
import React from 'react'

import { PostCardContext } from '../model'
import { PostCardAuthor } from './post-card-author.component'
import { PostCardContent } from './post-card-content.component'
import { PostCardReactions } from './post-card-reactions.component'

interface IPostCardProperties extends IPost {
  children: React.ReactNode
}

export const PostCard = (props: IPostCardProperties) => {
  const { creatorAddress, mirrorFrom, children, lensId } = props

  const { avatar, name: username } = UserModelService.useUserInfo({
    address: creatorAddress as string,
  })
  const { name: fromMirrorName } = UserModelService.useUserInfo({
    address: mirrorFrom as string,
  })

  const memoizedContextValue = React.useMemo(
    () => ({
      ...props,
      creatorAvatar: avatar,
      creatorUsername: username,
      fromMirrorName,
    }),
    [avatar, fromMirrorName, props, username]
  )

  return (
    <PostCardContext.Provider value={memoizedContextValue}>
      <article className="container border-b border-border-color pt-2 pb-4">
        {lensId}
        {children}
      </article>
    </PostCardContext.Provider>
  )
}

PostCard.Author = PostCardAuthor

PostCard.Content = PostCardContent

PostCard.Reactions = PostCardReactions
