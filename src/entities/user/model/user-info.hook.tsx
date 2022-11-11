import { userApi } from '@shared/api'
import { useEffect } from 'react'

export const useUserInfo = ({ address }: { address: string }) => {
  const {
    data: userInfo,
    refetch: refetchUserInfo,
    isLoading,
  } = userApi.useGetUserInfoQuery({ address })
  const [uploadImage] = userApi.useUploadUserAvatarMutation()
  const [updateUserInfo] = userApi.useUploadUserInfoMutation()

  useEffect(() => {
    refetchUserInfo()
  }, [address, refetchUserInfo])

  return {
    avatar: userInfo?.avatar,
    name: userInfo?.username,
    description: userInfo?.description,
    userInfo,
    refetchUserInfo,
    updateUserInfo,
    uploadImage,
    isLoading,
  }
}
