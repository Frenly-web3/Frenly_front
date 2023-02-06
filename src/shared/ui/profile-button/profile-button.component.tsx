import { Subscription } from '@shared/lib'
import React from 'react'

interface IProfileButtonProperties extends React.ComponentProps<'button'> {
  followUnfollowState: Subscription
}

export const ProfileButton = (props: IProfileButtonProperties) => {
  const { followUnfollowState } = props
  return (
    <button
      className={`rounded-full flex items-center ${
        followUnfollowState === Subscription.FOLLOW ? 'bg-main' : 'bg-error'
      } py-2 text-white text-sm font-semibold font-rounded w-23 pl-4 pr-4 m-auto mb-8`}
      {...props}
    >
      <span className="text-white/60 mr-2">
        {followUnfollowState === Subscription.FOLLOW ? '+' : '-'}
      </span>{' '}
      <>{followUnfollowState?.toLowerCase()}</>
    </button>
  )
}
