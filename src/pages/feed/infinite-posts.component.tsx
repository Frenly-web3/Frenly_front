import { useGetFilteredPosts } from '@entities/post'
import { EndOfPage, ScrollLoader } from '@shared/ui'
import * as React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { PostList } from './post-list.component'

export interface IInfinitePostsProperties {}

export function InfinitePosts(props: IInfinitePostsProperties) {
  const {} = props
  const { posts, isSuccess, hasMore, setTakeCount } = useGetFilteredPosts()

  const nextLoad = async () => {
    if (isSuccess) {
      setTakeCount((previousState) => previousState + 1)
    }
  }
  return (
    <div>
      <InfiniteScroll
        dataLength={posts.length}
        next={nextLoad}
        hasMore={hasMore}
        loader={<ScrollLoader />}
        endMessage={<EndOfPage page="feed" />}
      >
        <PostList posts={posts} />
      </InfiniteScroll>
    </div>
  )
}
