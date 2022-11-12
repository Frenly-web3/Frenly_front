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

  const getChunkPosts = useGetFilteredPosts()

  const [posts, setPosts] = useState<IPost[]>([])

  const { account } = useBlockchain()
  const viewerProfileLensId = useGetWalletProfileId(account as string)
  const { avatar } = UserModelService.useUserInfo({ address: account as string })

  const nextLoad = async () => {
    setTakeCount((previousState) => previousState + 1)
  }

  useEffect(() => {
    ;(async () => {
      const { posts: respPost } = await getChunkPosts({ take: 4, skip: takeCount * 4 })
      console.log(respPost)
      if (posts?.length > 0) {
        setPosts([...posts, ...respPost])
      } else {
        setPosts(respPost)
      }
    })()
  }, [takeCount, posts, getChunkPosts])

  console.log(posts)

  return (
    <>
      <Meta title="Frenly Feed" description="Your Frenly Feed" />

      <Header avatar={avatar} userLensId={viewerProfileLensId} />

      <main>
        <section className="relative">
          <InfiniteScroll
            dataLength={posts?.length}
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
