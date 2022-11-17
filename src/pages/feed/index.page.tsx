import { useGetFilteredPosts } from '@entities/post'
import { UserModelService } from '@entities/user'
import { SIZE_POST_CHUNK } from '@shared/lib/constants'
import { EndOfPage, Header, Meta, ScrollLoader } from '@shared/ui'
import { PostCard } from '@widgets/post'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useBlockchain, useGetWalletProfileId } from 'src/blockchain'

export default function FeedPage() {
  const [takeCount, setTakeCount] = useState(0)

  const { posts, lensIsLoading, isSuccess, hasMore, refetchFilteredFeed } =
    useGetFilteredPosts({
      take: SIZE_POST_CHUNK,
      skip: SIZE_POST_CHUNK * takeCount,
    })

  const { account } = useBlockchain()
  const viewerProfileLensId = useGetWalletProfileId(account as string)
  const { user } = UserModelService.useUserInfo({
    profileId: viewerProfileLensId as string,
  })
  const nextLoad = async () => {
    if (isSuccess && !lensIsLoading) {
      setTakeCount((previousState) => previousState + 1)
    }
  }

  return (
    <>
      <Meta title="Frenly Feed" description="Your Frenly Feed" />

      <Header avatar={user?.avatar} userLensId={viewerProfileLensId} />

      <main>
        <section className="relative">
          <InfiniteScroll
            dataLength={posts.length}
            next={nextLoad}
            hasMore={hasMore}
            loader={<ScrollLoader />}
            endMessage={<EndOfPage page="feed" />}
          >
            {posts?.map((post, index) => {
              return (
                // @ts-ignore
                <PostCard {...post} key={`${post.lensId}_${index}_${post.txHash}`}>
                  <PostCard.Author />
                  <PostCard.Content />
                  <PostCard.Reactions refetchFilteredFeed={refetchFilteredFeed} />
                </PostCard>
              )
            })}
          </InfiniteScroll>
        </section>
      </main>
    </>
  )
}
