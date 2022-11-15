import { UserModelService } from '@entities/user'
import { Subscription, useLoaderContext, UserStatusEnum } from '@shared/lib'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const useFollowUnfollowUser = ({ profileId }: { profileId: string }) => {
  const { user } = UserModelService.useUserInfo({ profileId })
  const { setIsLoading } = useLoaderContext()
  const [followUnfollowState, setFollowUnfollowState] = useState<Subscription | null>(
    null
  )
  useEffect(() => {
    console.log('Status', user)

    switch (user?.status) {
      case UserStatusEnum.Owner: {
        setFollowUnfollowState(null)
        break
      }
      case UserStatusEnum.Following: {
        setFollowUnfollowState(Subscription.UNFOLLOW)
        break
      }
      case UserStatusEnum.Viewer: {
        setFollowUnfollowState(Subscription.FOLLOW)
        break
      }
      default: {
        setFollowUnfollowState(null)
        break
      }
    }
  }, [profileId, user])

  // const followUser = async () => {}

  const followUnfollowHandler = useCallback(async () => {
    setIsLoading(true)
    try {
    } catch {
    } finally {
    }
  }, [profileId])

  return useMemo(
    () => ({
      followUnfollowHandler,
      followUnfollowState,
      followerAmount: user?.totalFollowers,
    }),
    [followUnfollowState, user?.totalFollowers]
  )
}
