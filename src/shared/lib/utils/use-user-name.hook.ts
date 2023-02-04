import { useEnsName } from 'wagmi'

import type { IAddress } from '../types'
import { shortAddress } from './format-short-address'

interface IProperties {
  address: IAddress
  with0x?: boolean
}

export const useUserName = (props: IProperties) => {
  const { address, with0x } = props
  const { data: ensData, isLoading: ensLoading } = useEnsName({ address })

  const data = ensData && ensData != null ? ensData : shortAddress({ address, with0x })

  return { data: data as string, isLoading: ensLoading }
}
