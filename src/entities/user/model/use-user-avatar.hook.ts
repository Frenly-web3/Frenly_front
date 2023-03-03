import { userApi } from '@shared/api'
import type { IAddress } from '@shared/lib'
import { useEnsAvatar } from 'wagmi'

interface IProperties {
  address: IAddress
}
export const useUserAvatar = (props: IProperties) => {
  const { address } = props

  const placeholder = '/assets/images/default-avatar.png'

  const { data: ensData, isLoading: ensLoading } = useEnsAvatar({ address })
  // const { data: backendData, isLoading: backendLoading } = userApi.useGetUserInfoQuery({
  //   address,
  // })

  // const backendAvatar = backendData?.avatar
  //   ? `https://stage.frenly.cc/rest/avatars/${backendData?.avatar}`
  //   : null

  const isLoading = ensLoading
  const data = ensData || placeholder

  return { data, isLoading }
}
