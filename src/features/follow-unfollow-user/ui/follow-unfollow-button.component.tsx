import { ProfileButton } from '@shared/ui'
import React from 'react'

import { useFollowUnfollowUser } from '../model'

interface IFollowUnfollowButtonProperties {
  profileId: string
}

export const FollowUnfollowButton = (props: IFollowUnfollowButtonProperties) => {
  const { profileId } = props
  const { followUnfollowHandler, followUnfollowState, followerAmount } =
    useFollowUnfollowUser({
      profileId,
    })
  return (
    <>
      <div className="text-base font-normal text-gray mb-5 text-center m-auto mt-4">
        {followerAmount !== undefined ? `Followers: ${followerAmount}` : `Followers: 0`}
      </div>
      {followUnfollowState !== null ? (
        <ProfileButton onClick={followUnfollowHandler}>
          {followUnfollowState}
        </ProfileButton>
      ) : (
        <></>
      )}
    </>
  )
}
