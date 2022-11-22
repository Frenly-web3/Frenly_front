import { UserModelService } from '@entities/user'
import { userApi } from '@shared/api'
import { useCallback, useEffect, useState } from 'react'

export const useUploadAvatar = ({ profileId }: { profileId: string }) => {
  const { user } = UserModelService.useUserInfo({ profileId })
  const [uploadImage] = userApi.useUploadUserAvatarMutation()
  const [previewValue, setPreviewValue] = useState(
    user?.avatar && user?.avatar !== null
      ? `${process.env.NEXT_PUBLIC_API_URL}avatars/${user?.avatar}`
      : '/assets/images/temp-avatar.png'
  )
  useEffect(() => {
    if (!user) {
      return
    }
    setPreviewValue(
      user?.avatar !== null
        ? `${process.env.NEXT_PUBLIC_API_URL}avatars/${user?.avatar}`
        : '/assets/images/temp-avatar.png'
    )
  }, [user])

  const changeImageHandle = useCallback(async ({ imageUrl }: { imageUrl: any }) => {
    try {
      const preview = URL.createObjectURL(imageUrl)
      setPreviewValue(preview)
      if (!imageUrl) {
        return
      }
      await uploadImage({ avatar: imageUrl }).unwrap()
    } catch (error) {
      console.log(error)
    }
  }, [])
  return {
    changeImageHandle,
    previewValue,
    avatar: user?.avatar,
  }
}
