import { useAccount } from 'wagmi'

import type { IAddress } from '../types'

export const useCheckIsOwner = (address: IAddress) => {
  const { isConnected, address: connectedAddress } = useAccount()

  if (!isConnected) return false

  return address === connectedAddress
}
