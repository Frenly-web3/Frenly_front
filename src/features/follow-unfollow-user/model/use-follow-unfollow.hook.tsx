import { UserModelService } from '@entities/user'
import { userApi } from '@shared/api'
import { Subscription, useLoaderContext, UserStatusEnum } from '@shared/lib'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

export const useFollowUnfollowUser = ({ profileId }: { profileId: string }) => {
  const { user, refetchUserInfo } = UserModelService.useUserInfo({ profileId })
  const { setIsLoading } = useLoaderContext()
  // const { account } = useBlockchain()
  const [followUnfollowState, setFollowUnfollowState] = useState<Subscription | null>(
    null
  )

  const { data } = userApi.useIsSubscriberQuery({ address: profileId })
  // ({
  //   // address,
  //   address: profileId,
  // })

  // const splitSignature = useSplitSignature()
  // const signTypedData = useSignTypedData()

  // const { createFollowTypedData } = useCreateFollowTypedData()

  // const { send: followWithSig } = useFollowWithSig()

  const [subscribeUser] = userApi.useSubscribeUserMutation()
  const [unSubscribeUser] = userApi.useUnSubscribeUserMutation()

  // console.log('isUserSubscriberOnBackend', data)

  // const { createUnfollowTypedData } = useCreateUnfollowTypedData()

  // const { unfollowWithSig } = useUnfollowWithSig()

  useEffect(() => {
    // const getIsUserSubscriberOnBackend = async () => {
    //   const isUserSubscriberOnBackend = await isSubscriber({
    //     address: user?.address as string,
    //   })
    //   console.log('isUserSubscriberOnBackend', isUserSubscriberOnBackend)

    if (user?.status == UserStatusEnum.Owner) {
      setFollowUnfollowState(null)
    } else {
      setFollowUnfollowState(data ? Subscription.UNFOLLOW : Subscription.FOLLOW)
    }

    // }
    // switch (user?.status) {
    //   case UserStatusEnum.Owner: {
    //     setFollowUnfollowState(null)
    //     break
    //   }
    //   case UserStatusEnum.Following: {
    //     setFollowUnfollowState(Subscription.UNFOLLOW)
    //     break
    //   }
    //   case UserStatusEnum.Viewer: {
    //     setFollowUnfollowState(Subscription.FOLLOW)
    //     break
    //   }
    //   default: {
    //     setFollowUnfollowState(null)
    //     break
    //   }
    // }
    // setFollowUnfollowState(
    //   isUserSubscriberOnBackend ? Subscription.FOLLOW : Subscription.UNFOLLOW
    // )

    // getIsUserSubscriberOnBackend()
  }, [profileId, user?.status, data])

  const followUser = async () => {
    try {
      setIsLoading(true)

      // const result = await createFollowTypedData({ followProfileId: profileId })

      // const typedData = result?.data?.createFollowTypedData?.typedData

      // const signature = await signTypedData({ typedData })

      // const { v, r, s } = await splitSignature({ signature: signature as string })

      // const { deadline, ...omitTypedData } = typedData.value

      // await followWithSig({
      //   follower: account as string,
      //   ...omitTypedData,
      //   sig: {
      //     v,
      //     r,
      //     s,
      //     deadline,
      //   },
      // })

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

      // const result = await createUnfollowTypedData({ followProfileId: profileId })

      // const typedData = result?.data?.createUnfollowTypedData?.typedData

      // const signature = await signTypedData({ typedData })

      // const { v, r, s } = await splitSignature({ signature: signature as string })

      // const { tokenId, deadline } = typedData.value

      // await unfollowWithSig({
      //   contractAddress: typedData.domain.verifyingContract,
      //   contractArgs: {
      //     tokenId,
      //     sig: {
      //       v,
      //       r,
      //       s,
      //       deadline,
      //     },
      //   },
      // })

      await unSubscribeUser({ address: user?.address as string })
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
