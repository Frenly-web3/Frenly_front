import type { IPost } from '@entities/post'
import { PostCard } from '@widgets/post'
import * as React from 'react'

export interface IPostListProperties {
  posts: IPost[]
}

export function PostList(props: IPostListProperties) {
  const { posts } = props

  return (
    <div>
      {posts?.map((post) => {
        return (
          <PostCard {...post} key={post.id}>
            <PostCard.Author />
            <PostCard.Content />
            <PostCard.Image />
            <PostCard.Reactions />
          </PostCard>
        )
      })}
    </div>
  )
}
