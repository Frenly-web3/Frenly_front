import { useGetFilteredPosts } from '@entities/post'
import { EndOfPage, Layout, ScrollLoader } from '@shared/ui'
import { PostCard } from '@widgets/post'
import InfiniteScroll from 'react-infinite-scroll-component'

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
        <InfiniteScroll
          dataLength={posts.length}
          next={nextLoad}
          hasMore={hasMore}
          loader={<ScrollLoader />}
          endMessage={<EndOfPage page="feed" />}
        >
          {posts?.map((post, index) => {
            return (
              <PostCard {...post} key={`${post.id}_${index}_${post.txHash}`}>
                <PostCard.Author />
                <PostCard.Content />
                <PostCard.Image />
                <PostCard.Reactions />
              </PostCard>
            )
          })}
        </InfiniteScroll>
      </section>
    </Layout>
  )
}
