import { useGetFilteredPosts } from '@entities/post'
import { EndOfPage, Layout, ScrollLoader } from '@shared/ui'
import { CommunitySingle } from '@widgets/community'
import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroll-component'

import { PostCardList } from './postcard-list'

export default function FeedPage() {
  const { posts, isSuccess, hasMore, setTakeCount } = useGetFilteredPosts()

  const nextLoad = async () => {
    if (isSuccess) {
      setTakeCount((previousState) => previousState + 1)
    }
  }
  return (
    <Layout title="feed" avatar={true}>
      <section className="container relative">
        <div className="p-4 bg-overlay-1-solid rounded-[1rem]">
          <CommunitySingle id="1" />
          <Link
            href={'/feed/1'}
            className="flex max-w-fit px-4 py-2 bg-main mt-2 ml-20 text-white rounded-[1rem]"
          >
            Explore
          </Link>
        </div>
      </section>
      <section className="container relative">
        <InfiniteScroll
          dataLength={posts.length}
          next={nextLoad}
          hasMore={hasMore}
          loader={<ScrollLoader />}
          endMessage={<EndOfPage page="feed" />}
        >
          <PostCardList posts={posts} />
        </InfiniteScroll>
      </section>
    </Layout>
  )
}
