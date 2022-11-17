import { UserModelService } from '@entities/user'
import {
  useCreateFollowTypedData,
  useCreateUnfollowTypedData,
  userApi,
} from '@shared/api'
import { Subscription, useLoaderContext, UserStatusEnum } from '@shared/lib'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useBlockchain,
  useFollowWithSig,
  useSignTypedData,
  useSplitSignature,
  useUnfollowWithSig,
} from 'src/blockchain'

export const useFollowUnfollowUser = ({ profileId }: { profileId: string }) => {
  const { user, refetchUserInfo } = UserModelService.useUserInfo({ profileId })
  const { setIsLoading } = useLoaderContext()
  const { account } = useBlockchain()
  const [followUnfollowState, setFollowUnfollowState] = useState<Subscription | null>(
    null
  )

  const splitSignature = useSplitSignature()
  const signTypedData = useSignTypedData()

  const { createFollowTypedData } = useCreateFollowTypedData()

  const { send: followWithSig } = useFollowWithSig()

  const [subscribeUser] = userApi.useSubscribeUserMutation()

  const { createUnfollowTypedData } = useCreateUnfollowTypedData()

  const { unfollowWithSig } = useUnfollowWithSig()

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
  }, [profileId, user?.status])

  const followUser = async () => {
    console.log('FOLLOW')
    try {
      setIsLoading(true)

      console.log(profileId)

      const result = await createFollowTypedData({ followProfileId: profileId })

      const typedData = result?.data?.createFollowTypedData?.typedData

      const signature = await signTypedData({ typedData })

      const { v, r, s } = await splitSignature({ signature: signature as string })

      const { deadline, ...omitTypedData } = typedData.value

      await followWithSig({
        follower: account as string,
        ...omitTypedData,
        sig: {
          v,
          r,
          s,
          deadline,
        },
      })
      await subscribeUser({ address: user?.address as string })
      setFollowUnfollowState(Subscription.UNFOLLOW)
    } catch (error_) {
      console.log(error_)
      // toast.error(String(error_))
    } finally {
      refetchUserInfo()
      setIsLoading(false)
    }
  }

  const unfollowUser = async () => {
    console.log('UNFOLLOW')

    try {
      setIsLoading(true)

      const result = await createUnfollowTypedData({ followProfileId: profileId })

      const typedData = result?.data?.createUnfollowTypedData?.typedData

      const signature = await signTypedData({ typedData })

      const { v, r, s } = await splitSignature({ signature: signature as string })

      const { tokenId, deadline } = typedData.value

      await unfollowWithSig({
        contractAddress: typedData.domain.verifyingContract,
        contractArgs: {
          tokenId,
          sig: {
            v,
            r,
            s,
            deadline,
          },
        },
      })
      setFollowUnfollowState(Subscription.FOLLOW)
    } catch (error) {
      // toast.error(String(error_))
      console.log(error)
    } finally {
      refetchUserInfo()
      setIsLoading(false)
    }
  }

  const followUnfollowHandler = useCallback(async () => {
    console.log('HANDLER')

    if (followUnfollowState == Subscription.FOLLOW) {
      await followUser()
    } else if (followUnfollowState == Subscription.UNFOLLOW) {
      await unfollowUser()
    }
  }, [profileId, followUnfollowState])

  return useMemo(
    () => ({
      followUnfollowHandler,
      followUnfollowState,
      followerAmount: user?.totalFollowers,
    }),
    [followUnfollowState, user?.totalFollowers]
  )
}
