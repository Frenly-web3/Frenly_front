import {
  useGetUserInfoQuery,
  useUploadImageMutation,
  useUploadInfoMutation,
} from '@store/auth/auth.api'
import { useEthers } from '@usedapp/core'
import { useEffect } from 'react'

export function useUpdate(address: string) {
  const { data: userInfo, refetch: refetchUserInfo } = useGetUserInfoQuery({
    address,
  })

  const [uploadImage] = useUploadImageMutation()

  const [updateUserInfo] = useUploadInfoMutation()

  useEffect(() => {
    refetchUserInfo()
  }, [address])

  return {
    avatar: userInfo?.data?.avatar,
    name: userInfo?.data.username,
    description: userInfo?.data.description,
    userInfo,
    refetchUserInfo,
    updateUserInfo,
    uploadImage,
  }
}
