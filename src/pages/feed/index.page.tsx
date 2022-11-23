import { useGetFilteredPosts } from '@entities/post'
import { UserModelService } from '@entities/user'
import { SellerTypeEnum } from '@shared/lib'
import { EndOfPage, Header, Meta, ScrollLoader } from '@shared/ui'
import { PostCard } from '@widgets/post'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useBlockchain, useGetWalletProfileId } from 'src/blockchain'

export default function FeedPage() {
  // const [takeCount, setTakeCount] = useState(0)

  const { account } = useBlockchain()

  const { posts, lensIsLoading, isSuccess, hasMore, refetchFilteredFeed, setTakeCount } =
    useGetFilteredPosts()
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
                  <PostCard.Image />
                  <PostCard.Subscription />
                  {post.sellerType === SellerTypeEnum.NftTransfer && (
                    <PostCard.Reactions refetchFilteredFeed={refetchFilteredFeed} />
                  )}
                  {post.sellerType === SellerTypeEnum.SellOrder && (
                    <PostCard.Order refetchFilteredFeed={refetchFilteredFeed} />
                  )}
                </PostCard>
              )
            })}
          </InfiniteScroll>
        </section>
      </main>
    </>
  )
}
