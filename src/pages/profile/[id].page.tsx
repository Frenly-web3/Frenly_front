import { useGetPublishedContentForUser } from '@entities/post'
import { UserModelService } from '@entities/user'
import { AddTrackAddress } from '@features/add-track-address'
import { RoleEnum, UserStatusEnum } from '@shared/lib'
import { Meta } from '@shared/ui'
import { UserProfileWidget } from '@widgets/user-profile'
import { useRouter } from 'next/router'
import React from 'react'

export default function ProfilePage() {
  const {
    query: { id },
    push,
  } = useRouter()

  // if we will add published posts and they should be always shown
  // const [isShowAddedPost, setShowAddedPost] = useState(true)

  // was needed when there was lens and button "show added posts or not"
  // const [isShowAddedPost, setShowAddedPost] = useState(false)

  const { user } = UserModelService.useUserInfo({ profileId: id as string })
  // const {
  //   posts: unpublishedPosts,
  //   getMorePosts,
  //   hasMore: hasMoreUnpublished,
  //   setZeroPosts: setZeroPostsUnpublish,
  // } = useGetUnpublishedPostsForUser({
  //   profileId: id as string,
  //   role: user?.role,
  //   skipReq: isShowAddedPost,
  // })

  // it was posts from lens. Now it's posts from backend
  // const {
  //   publishedPosts,
  //   fetchMorePosts,
  //   hasMore,
  //   setZeroPosts: setZeroPostsPublish,
  // } = useGetPublishedContentForUser({
  //   profileId: id as string,
  //   skip: !isShowAddedPost && user.status == UserStatusEnum.Owner,
  // })

  const {
    posts: publishedPosts,
    //  lensIsLoading,
    isSuccess,
    hasMore,
    refetchFilteredFeed,
    setTakeCount,
  } = useGetPublishedContentForUser(id as string)

  const nextLoad = async () => {
    // if (isSuccess && !lensIsLoading) {
    if (isSuccess) {
      setTakeCount((previousState) => previousState + 1)
    }
  }

  // const switcherHandler = () => {
  //   setShowAddedPost(!isShowAddedPost)
  //   // setZeroPostsUnpublish()
  //   setZeroPostsPublish()
  // }

  return (
    <>
      <Meta title={user.role} description="Your profile" />
      <UserProfileWidget profileId={id as string} />

      {user.status == UserStatusEnum.Owner && user.role == RoleEnum.Admin && (
        <AddTrackAddress />
      )}

      {/* {user.status === UserStatusEnum.Owner && (
        <Switcher checked={isShowAddedPost} switcherHandler={switcherHandler}>
          <span className="font-normal text-gray mb-5 text-center">
            {isShowAddedPost ? 'Added posts' : 'Not added posts'}
          </span>
        </Switcher>
      )} */}

      {/* {user.status == UserStatusEnum.Owner && (
        <div className="flex justify-end items-end container py-3">
          <div className="w-40">
            <Button onClick={() => push('/nfts')}>My NFT`s</Button>
          </div>
        </div>
      )} */}
      {/* {!isShowAddedPost && user.status == UserStatusEnum.Owner && (
        <InfiniteScroll *
       
        //   dataLength={unpublishedPosts?.length}
        //   next={getMorePosts}
        //   hasMore={hasMoreUnpublished}
        //   loader={<ScrollLoader />}
        //   endMessage={<EndOfPage page="drafts" />}
        // >
        //   {unpublishedPosts?.map((post, index) => {
        //     return (
        //       <PostCard {...post} key={`${post.id}_${index}_${post.txHash}`}>
                {/* <PostCard.Author /> */}
      {/* <PostCard.Content key={`content_${post.id}_${index}_${post.txHash}`} />
                <PostCard.Image /> */}
      {/* <PostCard.Adding key={`adding_${post.id}_${index}_${post.txHash}`} /> */}
      {/* </PostCard>
            )
          })}
        </InfiniteScroll>
      )} */}
      {/* {(isShowAddedPost || user.status !== UserStatusEnum.Owner) && (
        <InfiniteScroll
          dataLength={publishedPosts?.length}
          next={nextLoad}
          hasMore={hasMore}
          loader={<ScrollLoader />}
          endMessage={<EndOfPage page="drafts" />}
        >
          {publishedPosts?.map((post, index) => {
            return (
              <PostCard {...post} key={`${post.id}_${post.date}_${post.txHash}`}>
                <PostCard.Author key={`author_${post.id}_${post.date}_${post.txHash}`} />
                <PostCard.Content
                  key={`content_${post.id}_${post.date}_${post.txHash}`}
                /> */}
      {/* <PostCard.Image /> */}
      {/* <PostCard.Reactions
                  key={`reactions_ ${post.id}_${post.date}_${post.txHash}`}
                  refetchFilteredFeed={() => console.log('ss')}
                /> */}
      {/* </PostCard>
            )
          })}
        </InfiniteScroll>
      )} */}
    </>
  )
}
