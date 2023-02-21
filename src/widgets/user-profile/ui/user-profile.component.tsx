import { FollowUnfollowButton } from '@features/follow-unfollow-user'
import { InfoUploadComponent } from '@features/update-user-info'
import type { IAddress } from '@shared/lib'
import React from 'react'

interface IUserProfileWidgetProperties {
  address: IAddress
}

export const UserProfileWidget = (props: IUserProfileWidgetProperties) => {
  const { address } = props

  return (
    <div className="container md:w-[24.5rem] md:ml-6 p-4 top-0 bg-white rounded-[2rem] md:min-w-[30.5rem]">
      <div className="flex flex-col justify-center items-center">
        <InfoUploadComponent address={address} />

        <div className="mt-8">
          <FollowUnfollowButton address={address} />
        </div>
      </div>
    </div>
  )
}
