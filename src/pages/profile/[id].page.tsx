import {
  useGetPublishedContentForUser,
  useGetUnpublishedPostsForUser,
} from '@entities/post'
import { UserModelService } from '@entities/user'
import { UserStatusEnum } from '@shared/lib'
import { EndOfPage, Meta, ScrollLoader, Switcher } from '@shared/ui'
import { PostCard } from '@widgets/post'
import { UserProfileWidget } from '@widgets/user-profile'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

export default function ProfilePage() {
  const {
    query: { id },
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
              <PostCard {...post} key={`${post.lensId} ${index}`}>
                {/* <PostCard.Author /> */}
                <PostCard.Content />
                <PostCard.Adding />
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
              <PostCard {...post} key={`${post.lensId} ${index}`}>
                <PostCard.Author />
                <PostCard.Content />
                <PostCard.Reactions refetchFilteredFeed={() => console.log('ss')} />
              </PostCard>
            )
          })}
        </InfiniteScroll>
      )}
    </>
  )
}
