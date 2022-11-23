import {
  useGetPublishedContentForUser,
  useGetUnpublishedPostsForUser,
} from '@entities/post'
import { UserModelService } from '@entities/user'
import { UserStatusEnum } from '@shared/lib'
import { Button, EndOfPage, Meta, ScrollLoader, Switcher } from '@shared/ui'
import { PostCard } from '@widgets/post'
import { UserProfileWidget } from '@widgets/user-profile'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function ProfilePage() {
  const {
    query: { id },
    push,
  } = useRouter()

  const [isShowAddedPost, setShowAddedPost] = useState(false)

  const { user } = UserModelService.useUserInfo({ profileId: id as string })
  const {
    posts: unpublishedPosts,
    getMorePosts,
    hasMore: hasMoreUnpublished,
    setZeroPosts: setZeroPostsUnpublish,
  } = useGetUnpublishedPostsForUser({
    profileId: id as string,
    role: user?.role,
    skipReq: isShowAddedPost,
  })

  const {
    publishedPosts,
    fetchMorePosts,
    hasMore,
    setZeroPosts: setZeroPostsPublish,
  } = useGetPublishedContentForUser({
    profileId: id as string,
    skip: !isShowAddedPost && user.status == UserStatusEnum.Owner,
  })

  const switcherHandler = () => {
    setShowAddedPost(!isShowAddedPost)
    setZeroPostsUnpublish()
    setZeroPostsPublish()
  }

  return (
    <>
      <Meta title={user.role} description="Your profile" />
      <UserProfileWidget profileId={id as string} />

      {user.status === UserStatusEnum.Owner && (
        <Switcher checked={isShowAddedPost} switcherHandler={switcherHandler}>
          <span className="font-normal text-gray mb-5 text-center">
            {isShowAddedPost ? 'Added posts' : 'Not added posts'}
          </span>
        </Switcher>
      )}

      <div className="flex justify-end items-end container py-3">
        <div className="w-40">
          <Button onClick={() => push('/nfts')}>My NFT`s</Button>
        </div>
      </div>
      {!isShowAddedPost && user.status == UserStatusEnum.Owner && (
        <InfiniteScroll
          dataLength={unpublishedPosts?.length}
          next={getMorePosts}
          hasMore={hasMoreUnpublished}
          loader={<ScrollLoader />}
          endMessage={<EndOfPage page="drafts" />}
        >
          {unpublishedPosts?.map((post, index) => {
            return (
              <PostCard {...post} key={`${post.lensId}_${index}_${post.txHash}`}>
                {/* <PostCard.Author /> */}
                <PostCard.Content
                  key={`content_${post.lensId}_${index}_${post.txHash}`}
                />
                <PostCard.Image />
                <PostCard.Adding key={`adding_${post.lensId}_${index}_${post.txHash}`} />
              </PostCard>
            )
          })}
        </InfiniteScroll>
      )}

      {(isShowAddedPost || user.status !== UserStatusEnum.Owner) && (
        <InfiniteScroll
          dataLength={publishedPosts?.length}
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={<ScrollLoader />}
          endMessage={<EndOfPage page="drafts" />}
        >
          {publishedPosts?.map((post, index) => {
            return (
              <PostCard {...post} key={`${post.lensId}_${post.date}_${post.txHash}`}>
                <PostCard.Author
                  key={`author_${post.lensId}_${post.date}_${post.txHash}`}
                />
                <PostCard.Content
                  key={`content_${post.lensId}_${post.date}_${post.txHash}`}
                />
                <PostCard.Image />
                <PostCard.Reactions
                  key={`reactions_ ${post.lensId}_${post.date}_${post.txHash}`}
                  refetchFilteredFeed={() => console.log('ss')}
                />
              </PostCard>
            )
          })}
        </InfiniteScroll>
      )}
    </>
  )
}
