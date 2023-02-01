import { UserStatistic } from '@entities/user'
import type { IAddress } from '@shared/lib'
import { ProfileButton } from '@shared/ui'
import React from 'react'
import { useAccount } from 'wagmi'

import { useFollowUnfollowUser } from '../model'


interface IFollowUnfollowButtonProperties {
  address: IAddress
}

export const FollowUnfollowButton = (props: IFollowUnfollowButtonProperties) => {
  const { address } = props
  const { followUnfollowHandler, followUnfollowState, followerAmount } =
    useFollowUnfollowUser({ address })

  const { address: connectedAddress } = useAccount()
  return (
    <>
      <div className="flex justify-between w-40">
        <UserStatistic label="followers" count={followerAmount ?? 0} />
        <UserStatistic label="follows" count={2} />
      </div>
      {connectedAddress != address && (
        <ProfileButton onClick={followUnfollowHandler}>
          {followUnfollowState}
        </ProfileButton>
      )}
    </>
  )
}
