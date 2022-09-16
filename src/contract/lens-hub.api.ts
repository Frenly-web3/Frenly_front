import { useCall, useContractFunction } from '@usedapp/core'
import { Contract, ethers } from 'ethers'

import { lensHubABI, lensHubContract } from './lens-hub.contract'

//   return await contract.tokenOfOwnerByIndex(address, 0)
// }
const lensInterface = new ethers.utils.Interface(lensHubABI)
const lensContract = new Contract(lensHubContract, lensInterface)

export function useGetWalletProfileId(address: String) {
  const { value, error } =
    useCall({
      contract: lensContract,
      method: 'tokenOfOwnerByIndex',
      args: [address, 0],
    }) ?? {}

  if (error) {
    console.error(error.message)
    return
  }

  return value ? value[0]._hex : null
}

export function useHaveProfile(address: string | undefined) {
  const { value, error } =
    useCall({
      contract: lensContract,
      method: 'balanceOf',
      args: [address],
    }) ?? {}

  if (error) {
    console.error(error.message)
    return
  }

  return value ? Number.parseInt(value[0]._hex, 16) : null
}
export function usePostWithSig() {
  const { state, send } = useContractFunction(lensContract, 'postWithSig')
  return { state, send }
}
