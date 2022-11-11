import type { IPost } from '@entities/post'
import { useGetFilteredPosts } from '@entities/post'
import { UserModelService } from '@entities/user'
import { EndOfPage, Header, Meta } from '@shared/ui'
import { PostCard } from '@widgets/post'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useBlockchain, useGetWalletProfileId } from 'src/blockchain'

export default function FeedPage() {
  const [takeCount, setTakeCount] = useState(0)

  const { posts: chunkPosts } = useGetFilteredPosts({
    take: 4,
    skip: 4 * takeCount,
  })

  const [posts, setPosts] = useState<IPost[]>([])

  const { account } = useBlockchain()
  const viewerProfileLensId = useGetWalletProfileId(account as string)
  const { avatar } = UserModelService.useUserInfo({ address: account as string })

  const nextLoad = () => {
    console.log('==================nextload================')

    setTakeCount((previousState) => previousState + 1)
  }

  useEffect(() => {
    console.log(chunkPosts)
    if (takeCount == 0) {
      setPosts(chunkPosts)
    } else {
      setPosts([...posts, ...chunkPosts])
    }
  }, [chunkPosts])

  return (
    <>
      <Meta title="Frenly Feed" description="Your Frenly Feed" />

      <Header avatar={avatar} userLensId={viewerProfileLensId} />

      <main>
        <section className="relative">
          <InfiniteScroll
            dataLength={50}
            next={nextLoad}
            hasMore={true}
            loader={<>Loading...</>}
            endMessage={<EndOfPage page="feed" />}
          >
            {posts?.map((post, index) => {
              return (
                // @ts-ignore
                <PostCard {...post} key={`${post.lensId} ${index}`}>
                  <PostCard.Author />
                  <PostCard.Content />
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
