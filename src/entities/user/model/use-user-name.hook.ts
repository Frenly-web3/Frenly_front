import { userApi } from '@shared/api'
import type { IAddress } from '@shared/lib'
import { shortAddress } from '@shared/lib'
import { useEnsName } from 'wagmi'

interface IProperties {
  address: IAddress
}

export const useUserName = (props: IProperties) => {
  const { address } = props

  const { data: ensData, isLoading: ensLoading } = useEnsName({ address })

  const { data: backendData, isLoading: backendLoading } = userApi.useGetUserInfoQuery({
    address,
  })

  const isLoading = ensLoading ? true : !!backendLoading
  const data = ensData || shortAddress({ address: backendData?.walletAddress! })

  return { data, isLoading }
}
