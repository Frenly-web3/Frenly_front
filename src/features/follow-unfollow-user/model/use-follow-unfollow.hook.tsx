import { useUserInfo } from '@entities/user'
import { userApi } from '@shared/api'
import type { IAddress } from '@shared/lib'
import { Subscription } from '@shared/lib'
import React from 'react'

interface IProperties {
  address: IAddress
}

export const useFollowUnfollowUser = (props: IProperties) => {
  const { address } = props
  const { user, refetchUserInfo } = useUserInfo({ address })
  // const { setIsLoading } = useLoaderContext()
  const [followUnfollowState, setFollowUnfollowState] =
    React.useState<Subscription | null>(null)

  const { data: isSubscribed, isLoading } = userApi.useIsSubscriberQuery({ address })

  React.useEffect(() => {
    if (isSubscribed) {
      setFollowUnfollowState(Subscription.UNFOLLOW)
    } else {
      setFollowUnfollowState(Subscription.FOLLOW)
    }
  }, [isSubscribed])

  const [subscribeUser] = userApi.useSubscribeUserMutation()
  const [unSubscribeUser] = userApi.useUnSubscribeUserMutation()

  const followUser = async () => {
    try {
      // setIsLoading(true)

      await subscribeUser({ address: user?.walletAddress })
      setFollowUnfollowState(Subscription.UNFOLLOW)
    } catch (error_) {
    } finally {
      refetchUserInfo()
      // setIsLoading(false)
    }
  }

  const unfollowUser = async () => {
    try {
      // setIsLoading(true)
      await unSubscribeUser({ address: user?.walletAddress })
      setFollowUnfollowState(Subscription.FOLLOW)
    } catch (error) {
    } finally {
      refetchUserInfo()
      // setIsLoading(false)
    }
  }

  const followUnfollowHandler = React.useCallback(async () => {
    if (followUnfollowState == Subscription.FOLLOW) {
      await followUser()
    } else if (followUnfollowState == Subscription.UNFOLLOW) {
      await unfollowUser()
    }
    refetchUserInfo()
  }, [followUnfollowState, followUser, refetchUserInfo, unfollowUser])

  return {
    isLoading,
    followUnfollowHandler,
    followUnfollowState,
    followerAmount: user.totalFollowers,
    subscriberAmount: user.totalSubscribers,
  }
}
