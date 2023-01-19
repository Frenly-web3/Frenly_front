import { useGetCommunityPosts } from '@entities/post'
import { EndOfPage, Layout, ScrollLoader } from '@shared/ui'
import { PostCard } from '@widgets/post'
import type { GetServerSideProps } from 'next'
import InfiniteScroll from 'react-infinite-scroll-component'

export interface IProperties {
  communityId: string
}

export default function FeedPage(props: IProperties) {
  const { communityId } = props
  const { posts, isSuccess, hasMore, setTakeCount } = useGetCommunityPosts({
    communityId,
  })

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
export const getServerSideProps: GetServerSideProps<IProperties> = async (context) => {
  const {
    query: { id },
  } = context
  return { props: { communityId: id as string } }
}
