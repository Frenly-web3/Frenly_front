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
      <div className="text-base font-normal text-gray mb-5 text-center m-auto mt-4">
        {`Followers: ${followerAmount || 0}`}
      </div>
      {connectedAddress != address && (
        <ProfileButton onClick={followUnfollowHandler}>
          {followUnfollowState}
        </ProfileButton>
      )}
    </>
  )
}
