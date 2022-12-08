import { userApi } from '@shared/api'
import { RoleEnum, useCheckIsAdmin, UserStatusEnum } from '@shared/lib'
import { useEffect, useMemo, useState } from 'react'
import { useBlockchain } from 'src/blockchain'

import type { IUser } from './user.entity'

export const useUserInfo = ({
  profileId,
}: {
  profileId: string
}): { user: IUser; refetchUserInfo: () => void; isLoading: boolean } => {
  // const address = useGetWalletAddress({ tokenId: profileId })

  const { account } = useBlockchain()

  // const viewerProfileId = useGetWalletProfileId(account as string)
  const [userStatus, setUserStatus] = useState<UserStatusEnum>(UserStatusEnum.Viewer)

  const {
    data: userInfo,
    refetch: refetchUserInfo,
    isLoading,
  } = userApi.useGetUserInfoQuery({
    // address,
    address: profileId,
  })
  // const { data: userInfoLens, refetch: refetchUserLensInfo } = useGetUserLensInfo({
  //   profileId,
  //   isFollowingId: viewerProfileId,
  // })

  // const isAdmin = useCheckIsAdmin({ address })
  const isAdmin = useCheckIsAdmin({ address: profileId })

  useEffect(() => {
    refetchUserInfo()
    // refetchUserLensInfo()
  }, [
    // address,
    profileId,
    account,
  ])

  useEffect(() => {
    // if (account === address) {
    if (account?.toLowerCase() === profileId?.toLowerCase()) {
      setUserStatus(UserStatusEnum.Owner)
      return
    }
    // console.log(userInfoLens)

    // ВОПРОС - ДЛЯ ЧЕГО ЭТО БЫЛО???
    // if (userInfoLens?.profile?.isFollowing) {
    //   setUserStatus(UserStatusEnum.Following)
    //   return
    // }
    setUserStatus(UserStatusEnum.Viewer)
  }, [
    account,
    //  address, userInfoLens,
    profileId,
  ])

  return useMemo(
    () => ({
      user: {
        address: profileId,
        avatar: `${process.env.NEXT_PUBLIC_API_URL}avatars/${userInfo?.avatar}`,
        description: userInfo?.description,
        // isPaidSubscription: !!userInfoLens?.followModule,
        isPaidSubscription: false,
        lensId: profileId,
        name: userInfo?.username,
        role: isAdmin ? RoleEnum.Admin : RoleEnum.User,
        status: userStatus,
        // totalFollowers: userInfoLens?.profile?.stats?.totalFollowers,
        totalFollowers: userInfo?.totalFollowers,
      },
      refetchUserInfo: () => {
        refetchUserInfo()
        // refetchUserLensInfo()
      },
      isLoading,
    }),
    [
      profileId,
      // address,
      userInfo?.avatar,
      userInfo?.description,
      userInfo?.username,
      userInfo?.totalFollowers,
      // userInfoLens?.followModule,
      // userInfoLens?.profile?.stats?.totalFollowers,
      profileId,
      isAdmin,
      userStatus,
      isLoading,
    ]
  )
}
