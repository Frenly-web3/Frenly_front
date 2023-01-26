import { userApi } from '@shared/api'
import type { IAddress } from '@shared/lib'
import React from 'react'

import type { IUser } from './user.entity'

interface IProperties {
  address: IAddress
}

export const useUserInfo = (props: IProperties) => {
  const { address } = props

  const {
    data: userInfo,
    refetch: refetchUserInfo,
    isLoading,
  } = userApi.useGetUserInfoQuery({ address })

  React.useEffect(() => {
    refetchUserInfo()
  }, [refetchUserInfo])

  const user: IUser = {
    id: userInfo?.id!,
    totalFollowers: userInfo?.totalFollowers!,
    totalSubscribers: userInfo?.totalSubscribers!,
    walletAddress: address,
  }

  return {
    user,
    refetchUserInfo,
    isLoading,
  }
}
