import { useGetUserLensInfo, userApi } from '@shared/api'
import { RoleEnum, useCheckIsAdmin, UserStatusEnum } from '@shared/lib'
import { useEffect, useMemo, useState } from 'react'
import { useBlockchain, useGetWalletAddress, useGetWalletProfileId } from 'src/blockchain'

import type { IUser } from './user.entity'

export const useUserInfo = ({
  profileId,
}: {
  profileId: string
}): { user: IUser; refetchUserInfo: () => void; isLoading: boolean } => {
  const address = useGetWalletAddress({ tokenId: profileId })

  const { account } = useBlockchain()

  const viewerProfileId = useGetWalletProfileId(account as string)
  const [userStatus, setUserStatus] = useState<UserStatusEnum>(UserStatusEnum.Viewer)

  const {
    data: userInfo,
    refetch: refetchUserInfo,
    isLoading,
  } = userApi.useGetUserInfoQuery({
    address,
  })
  const { data: userInfoLens, refetch: refetchUserLensInfo } = useGetUserLensInfo({
    profileId,
    isFollowingId: viewerProfileId,
  })

  const isAdmin = useCheckIsAdmin({ address })

  useEffect(() => {
    refetchUserInfo()
    refetchUserLensInfo()
  }, [address, profileId, account])

  useEffect(() => {
    if (account === address) {
      setUserStatus(UserStatusEnum.Owner)
      return
    }

    if (userInfoLens?.profile?.isFollowing) {
      setUserStatus(UserStatusEnum.Following)
      return
    }
    setUserStatus(UserStatusEnum.Viewer)
  }, [account, address, userInfoLens, profileId])

  return useMemo(
    () => ({
      user: {
        address,
        avatar: `${process.env.NEXT_PUBLIC_API_URL}avatars/${userInfo?.avatar}`,
        description: userInfo?.description,
        isPaidSubscription: !!userInfoLens?.followModule,
        lensId: profileId,
        name: userInfo?.username,
        role: isAdmin ? RoleEnum.Admin : RoleEnum.User,
        status: userStatus,
        totalFollowers: userInfoLens?.profile?.stats?.totalFollowers,
      },
      refetchUserInfo: () => {
        refetchUserInfo()
        refetchUserLensInfo()
      },
      isLoading,
    }),
    [
      address,
      userInfo?.avatar,
      userInfo?.description,
      userInfo?.username,
      userInfoLens?.followModule,
      userInfoLens?.profile?.stats?.totalFollowers,
      profileId,
      isAdmin,
      userStatus,
      isLoading,
    ]
  )
}
