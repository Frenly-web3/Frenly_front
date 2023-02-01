import type { IAddress } from '@shared/lib'
import { shortAddress } from '@shared/lib'
import { useEnsName } from 'wagmi'

interface IProperties {
  address: IAddress
  with0x?: boolean
}

export const useUserName = (props: IProperties) => {
  const { address, with0x } = props

  console.log(address)
  const { data: ensData, isLoading: ensLoading } = useEnsName({ address })

  const data = ensData && ensData != null ? ensData : shortAddress({ address, with0x })

  console.log(ensData, ensLoading)

  return { data: data as string, isLoading: ensLoading }
}
