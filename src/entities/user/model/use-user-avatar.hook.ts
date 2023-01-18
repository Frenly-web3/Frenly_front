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
  const { data: backendData, isLoading: backendLoading } = userApi.useGetUserInfoQuery({
    address,
  })

  const isLoading = ensLoading ? true : !!backendLoading
  const data = ensData || backendData?.avatar || placeholder
  
  return { data, isLoading }
}
