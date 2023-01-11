import { useGetCommunityPosts } from '@entities/post'
import { UserModelService } from '@entities/user'
import { EndOfPage, Header, Meta, ScrollLoader } from '@shared/ui'
import { CommunitySingle } from '@widgets/community'
import { PostCard } from '@widgets/post'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useBlockchain, useGetWalletProfileId } from 'src/blockchain'

export default function FeedPage() {
  const router = useRouter()
  const communityId = router.query.id as string
  let userAddressForHeader = null

  const { account } = useBlockchain()

  if (account) {
    userAddressForHeader = account
  }

  const { posts, isSuccess, hasMore, setTakeCount } = useGetCommunityPosts({
    communityId,
  })
  const viewerProfileLensId = useGetWalletProfileId(account as string)
  const { user, isLoading } = UserModelService.useUserInfo({
    profileId: account as string,
  })

  const nextLoad = async () => {
    // if (isSuccess && !lensIsLoading) {
    if (isSuccess) {
      setTakeCount((previousState) => previousState + 1)
    }
  }

  return (
    <>
      <Meta title="Frenly Feed" description="Your Frenly Feed" />

      <Header
        avatar={user?.avatar}
        isLoading={isLoading}
        userLensId={viewerProfileLensId}
        userAddress={userAddressForHeader}
      />

      <main>
        <section className={`container relative`}>
          <div className={`bg-overlay-1-solid p-4 rounded-[2rem]`}>
            <CommunitySingle id={communityId!} />
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
      </main>
    </>
  )
}
