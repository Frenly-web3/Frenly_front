import type { IPost } from '@entities/post'
import { UserModelService } from '@entities/user'
import React from 'react'
import { useGetWalletProfileId } from 'src/blockchain'

import { PostCardContext } from '../model'
import { PostCardAdding } from './post-card-adding.component'
import { PostCardAuthor } from './post-card-author.component'
import { PostCardContent } from './post-card-content.component'
import { PostCardImage } from './post-card-image.component'
import { PostCardOrder } from './post-card-order.component'
import { PostCardReactions } from './post-card-reactions.component'
import { PostCardSubscription } from './post-card-subscription.component'

interface IPostCardProperties extends IPost {
  children: React.ReactNode
}

export const PostCard = (props: IPostCardProperties) => {
  const { creatorLensId, mirrorFrom, children, creatorAddress } = props

  const creatorLensIdViaAddress = useGetWalletProfileId(creatorAddress as string)

  const { user: creatorInfo, isLoading } = UserModelService.useUserInfo({
    profileId: creatorLensId ?? creatorLensIdViaAddress,
  })

  const mirrorLensId = useGetWalletProfileId(mirrorFrom as string)

  const { user: creatorMirrorInfo } = UserModelService.useUserInfo({
    profileId: mirrorLensId as string,
  })
  const memoizedContextValue = React.useMemo(
    () => ({
      ...props,
      creatorAvatar: creatorInfo.avatar,
      creatorLensId: creatorInfo.lensId,
      creatorUsername: creatorInfo.name,
      fromMirrorName: creatorMirrorInfo.name,
      isLoading,
    }),
    [
      creatorInfo.avatar,
      creatorInfo.lensId,
      creatorInfo.name,
      creatorMirrorInfo.name,
      isLoading,
      props,
    ]
  )

  return (
    <PostCardContext.Provider value={memoizedContextValue}>
      <article className="container border-b border-border-color pt-2 pb-4">
        {children}
      </article>
    </PostCardContext.Provider>
  )
}

PostCard.Author = PostCardAuthor

PostCard.Content = PostCardContent

PostCard.Reactions = PostCardReactions

PostCard.Adding = PostCardAdding

PostCard.Subscription = PostCardSubscription

PostCard.Image = PostCardImage

PostCard.Order = PostCardOrder
