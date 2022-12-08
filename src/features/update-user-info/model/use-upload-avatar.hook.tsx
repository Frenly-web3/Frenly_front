import { UserModelService } from '@entities/user'
import { userApi } from '@shared/api'
import { useUnificationFormatImage } from '@shared/lib'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const useUploadAvatar = ({ profileId }: { profileId: string }) => {
  const { user, isLoading } = UserModelService.useUserInfo({ profileId })
  const [uploadImage] = userApi.useUploadUserAvatarMutation()
  const [previewValue, setPreviewValue] = useState<string | null>(null)

  console.log('user in useUploadAvatar', user)

  const avatarUnification = useUnificationFormatImage({ image: user?.avatar as string })

  useEffect(() => {
    if (!avatarUnification && isLoading) {
      setPreviewValue(null)
      return
    }
    if (!avatarUnification && !isLoading) {
      setPreviewValue('/assets/images/temp-avatar.png')
      return
    }
    if (avatarUnification && !isLoading) {
      setPreviewValue(avatarUnification)
    }
  }, [isLoading, avatarUnification])

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
  return useMemo(
    () => ({
      changeImageHandle,
      previewValue,
      avatar: user?.avatar,
    }),
    [previewValue, user?.avatar]
  )
}
