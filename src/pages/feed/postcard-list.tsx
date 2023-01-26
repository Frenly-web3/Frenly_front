import type { IPost } from '@entities/post'
import { PostCard } from '@widgets/post'
import * as React from 'react'

export interface IPostCardListProperties {
  posts: IPost[]
}

export function PostCardList(props: IPostCardListProperties) {
  const { posts } = props
  return (
    <div>
      {posts?.map((post) => {
        return (
          // @ts-ignore
          // change lensId to id
          <PostCard {...post} key={post.id}>
            <PostCard.Author />
            <PostCard.Content />
            <PostCard.Image />
            {/* <PostCard.Subscription /> */}
            {/* {post?.sellerType === SellerTypeEnum.NftTransfer && (
                    <PostCard.Reactions refetchFilteredFeed={refetchFilteredFeed} />
                  )} */}
            {/* {post.sellerType === SellerTypeEnum.SellOrder && (
                    <PostCard.Order refetchFilteredFeed={refetchFilteredFeed} />
                  )} */}
            <PostCard.Reactions />
          </PostCard>
        )
      })}
    </div>
  )
}
