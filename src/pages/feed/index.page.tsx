import { useGetFilteredPosts } from '@entities/post'
import { UserModelService } from '@entities/user'
import { EndOfPage, Header, Meta, ScrollLoader } from '@shared/ui'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useBlockchain, useGetWalletProfileId } from 'src/blockchain'

import { PostCardList } from './postcard-list'

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
        {/* <section className={`container relative`}>
          <div className={`bg-overlay-1-solid p-4 rounded-[2rem]`}>
            <CommunityList />
          </div>
        </section> */}
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
      </main>
    </>
  )
}
