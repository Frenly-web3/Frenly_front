import { useGetUserLensInfo, userApi } from '@shared/api'
import { RoleEnum, useCheckIsAdmin, UserStatusEnum } from '@shared/lib'
import { useEffect, useMemo, useState } from 'react'
import { useBlockchain, useGetWalletAddress, useGetWalletProfileId } from 'src/blockchain'

import type { IUser } from './user.entity'

export const useUserInfo = ({
  profileId,
}: {
  profileId: string
}): { user: IUser; refetchUserInfo: () => void } => {
  const address = useGetWalletAddress({ tokenId: profileId })

  const { account } = useBlockchain()

  const viewerProfileId = useGetWalletProfileId(account as string)
  const [userStatus, setUserStatus] = useState<UserStatusEnum>(UserStatusEnum.Viewer)

  const { data: userInfo, refetch: refetchUserInfo } = userApi.useGetUserInfoQuery({
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
  }, [address, profileId])

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
  }, [account, address, userInfoLens])

  return useMemo(
    () => ({
      user: {
        address,
        avatar: userInfo?.avatar,
        description: userInfo?.description,
        isPaidSubscription: !!userInfoLens?.followModule,
        lensId: profileId,
        name: userInfo?.username,
        role: isAdmin ? RoleEnum.Admin : RoleEnum.User,
        status: userStatus,
        totalFollowers: userInfoLens?.profile?.stats?.totalFollowers,
      },
      refetchUserInfo,
    }),
    [address, isAdmin, profileId, userInfo, userStatus]
  )
}
