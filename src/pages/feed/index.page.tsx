import { useGetFilteredPosts } from '@entities/post'
import { UserModelService } from '@entities/user'
import { EndOfPage, Header, Meta, ScrollLoader } from '@shared/ui'
import { PostCard } from '@widgets/post'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useBlockchain, useGetWalletProfileId } from 'src/blockchain'

export default function FeedPage() {
  // const [takeCount, setTakeCount] = useState(0)
  let userAddressForHeader = null

  const { account } = useBlockchain()

  if (account) {
    userAddressForHeader = account
  }

  const {
    posts,
    //  lensIsLoading,
    isSuccess,
    hasMore,
    // refetchFilteredFeed,
    setTakeCount,
  } = useGetFilteredPosts()
  const viewerProfileLensId = useGetWalletProfileId(account as string)
  const { user, isLoading } = UserModelService.useUserInfo({
    profileId: account as string,
    // profileId: viewerProfileLensId as string,
  })

  // console.log('check user avatar', user)
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
        // added
        userAddress={userAddressForHeader}
      />

      <main>
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
                // @ts-ignore
                // change lensId to id
                <PostCard {...post} key={`${post.id}_${index}_${post.txHash}`}>
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
          </InfiniteScroll>
        </section>
      </main>
    </>
  )
}
