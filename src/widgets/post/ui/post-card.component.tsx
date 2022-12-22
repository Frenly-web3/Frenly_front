import type { IPost } from '@entities/post'
import { UserModelService } from '@entities/user'
import React from 'react'

import { PostCardContext } from '../model'
import { PostCardAuthor } from './post-card-author.component'
import { PostCardContent } from './post-card-content.component'
import { PostCardImage } from './post-card-image.component'
import { PostCardReactions } from './post-card-reactions.component'

interface IPostCardProperties extends IPost {
  children: React.ReactNode
}

export const PostCard = (props: IPostCardProperties) => {
  const {
    //  creatorLensId, mirrorFrom,
    children,
    creatorAddress,
  } = props

  // const creatorLensIdViaAddress = useGetWalletProfileId(creatorAddress as string)

  // const { user: creatorInfo, isLoading } = UserModelService.useUserInfo({
  //   profileId: creatorLensId ?? creatorLensIdViaAddress,
  // })

  const { user: creatorInfo, isLoading } = UserModelService.useUserInfo({
    profileId: creatorAddress,
  })

  // const mirrorLensId = useGetWalletProfileId(mirrorFrom as string)

  // const { user: creatorMirrorInfo } = UserModelService.useUserInfo({
  //   profileId: mirrorLensId as string,
  // })
  const memoizedContextValue = React.useMemo(
    () => ({
      ...props,
      creatorAvatar: creatorInfo.avatar,
      creatorLensId: creatorInfo.lensId,
      creatorUsername: creatorInfo.name,
      // fromMirrorName: creatorMirrorInfo.name,
      isLoading,
    }),
    [
      creatorInfo.avatar,
      creatorInfo.lensId,
      creatorInfo.name,
      // creatorMirrorInfo.name,
      isLoading,
      props,
    ]
  )

  return (
    <PostCardContext.Provider value={memoizedContextValue}>
      <article className="bg-background mb-4 py-4 rounded-[2rem] px-0">
        {children}
      </article>
    </PostCardContext.Provider>
  )
}

PostCard.Author = PostCardAuthor

PostCard.Content = PostCardContent

PostCard.Reactions = PostCardReactions

// PostCard.Adding = PostCardAdding

// PostCard.Subscription = PostCardSubscription

PostCard.Image = PostCardImage

// PostCard.Order = PostCardOrder
