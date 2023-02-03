import { useGetCommunityPosts } from '@entities/post'
import { EndOfPage, ScrollLoader } from '@shared/ui'
import { CommunitySingle } from '@widgets/community'
import { Layout } from '@widgets/layout'
import InfiniteScroll from 'react-infinite-scroll-component'

import { PostList } from './post-list.component'

export default function FeedPage() {
  const { posts, isSuccess, hasMore, setTakeCount } = useGetCommunityPosts({
    communityId: '2',
  })

  const nextLoad = async () => {
    if (isSuccess) {
      setTakeCount((previousState) => previousState + 1)
    }
  }
  return (
    <Layout title="feed - Orange DAO" rightSidebar={<CommunitySingle id="2" />}>
      <section className="container relative">
        <InfiniteScroll
          dataLength={posts.length}
          next={nextLoad}
          hasMore={hasMore}
          loader={<ScrollLoader />}
          endMessage={<EndOfPage page="feed" />}
        >
          <PostList posts={posts} />
        </InfiniteScroll>
      </section>
    </Layout>
  )
}
