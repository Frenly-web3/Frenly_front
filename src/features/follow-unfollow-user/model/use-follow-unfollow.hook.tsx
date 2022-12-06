import { UserModelService } from '@entities/user'
import {
  useCreateFollowTypedData,
  useCreateUnfollowTypedData,
  userApi,
} from '@shared/api'
import { Subscription, useLoaderContext, UserStatusEnum } from '@shared/lib'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
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

  const { send: followWithSig, state: followWithSigState } = useFollowWithSig()

  const [subscribeUser] = userApi.useSubscribeUserMutation()

  const { createUnfollowTypedData } = useCreateUnfollowTypedData()

  const { unfollowWithSig } = useUnfollowWithSig()

  useEffect(() => {
    console.log(user?.status)

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
    try {
      setIsLoading(true)

      const result = await createFollowTypedData({ followProfileId: profileId })

      const typedData = result?.data?.createFollowTypedData?.typedData

      const signature = await signTypedData({ typedData })

      const { v, r, s } = await splitSignature({ signature: signature as string })

      const { deadline, ...omitTypedData } = typedData.value

      const resp = await followWithSig({
        follower: account as string,
        ...omitTypedData,
        sig: {
          v,
          r,
          s,
          deadline,
        },
      })

      console.log(followWithSigState, resp)

      await subscribeUser({ address: user?.address as string })
      setFollowUnfollowState(Subscription.UNFOLLOW)
    } catch (error_) {
      console.log(error_)
      toast.error('Something went wrong. Try again.', {
        icon: '😢',
      })
    } finally {
      refetchUserInfo()
      setIsLoading(false)
    }
  }

  const unfollowUser = async () => {
    try {
      setIsLoading(true)

      const result = await createUnfollowTypedData({ followProfileId: profileId })

      const typedData = result?.data?.createUnfollowTypedData?.typedData

      const signature = await signTypedData({ typedData })

      const { v, r, s } = await splitSignature({ signature: signature as string })

      const { tokenId, deadline } = typedData.value

      const resp = await unfollowWithSig({
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

      console.log(resp)

      setFollowUnfollowState(Subscription.FOLLOW)
    } catch (error) {
      // toast.error(String(error_))
      // @ts-ignore
      toast.error(error.message, {
        icon: '😢',
      })
      console.log(error)
    } finally {
      refetchUserInfo()
      setIsLoading(false)
    }
  }

  const followUnfollowHandler = useCallback(async () => {
    if (followUnfollowState == Subscription.FOLLOW) {
      await followUser()
    } else if (followUnfollowState == Subscription.UNFOLLOW) {
      await unfollowUser()
    }
    refetchUserInfo()
  }, [profileId, followUnfollowState])

  return useMemo(
    () => ({
      followUnfollowHandler,
      followUnfollowState,
      followerAmount: user.totalFollowers as number,
    }),
    [followUnfollowState, user.totalFollowers, profileId]
  )
}
