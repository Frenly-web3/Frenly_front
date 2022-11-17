import { FollowUnfollowButton } from '@features/follow-unfollow-user'
import { InfoUploadComponent } from '@features/update-user-info'
import React from 'react'

interface IUserProfileWidgetProperties {
  profileId: string
}

export const UserProfileWidget = (props: IUserProfileWidgetProperties) => {
  const { profileId } = props

  return (
    <div className="container py-3 top-0 bg-white">
      <div className="flex flex-col justify-center border-b border-border-color">
        <InfoUploadComponent profileId={profileId} />

        <FollowUnfollowButton profileId={profileId} />
      </div>
    </div>
  )
}
