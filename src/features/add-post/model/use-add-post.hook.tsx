import { UserModelService } from '@entities/user'
import { adminApi, contentApi } from '@shared/api'
import { RoleEnum, useLoaderContext } from '@shared/lib'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useBlockchain, useGetWalletProfileId } from 'src/blockchain'

interface IAddPost {
  backId: number
}

export const useAddPost = ({ backId }: IAddPost) => {
  const { setIsLoading } = useLoaderContext()

  const { account } = useBlockchain()

  const viewerProfileId = useGetWalletProfileId(account as string)

  const { user } = UserModelService.useUserInfo({ profileId: viewerProfileId })
  const [removeAdminContent] = adminApi.useRemoveContentMutation()
  const [removeContent] = contentApi.useRemoveContentMutation()

  const addPost = useCallback(() => {}, [])
  const declinePost = useCallback(async () => {
    try {
      setIsLoading(true)
      await (user.role === RoleEnum.Admin
        ? removeAdminContent({ contentId: backId.toString() }).unwrap()
        : removeContent({ contentId: backId.toString() }).unwrap())
    } catch (error_) {
      toast.error(String(error_))
    } finally {
      setIsLoading(false)
    }
  }, [backId, user.role])
  return {
    addPost,
    declinePost,
  }
}
