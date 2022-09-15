import { useCall, useContractFunction } from '@usedapp/core'
import { Contract, ethers } from 'ethers'

import { lensHubABI, lensHubContract } from './lens-hub.contract'

// export const getWalletProfileId = async (address: string, library: any) => {
//   const contract = createLensContract(library)

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

export function usePostWithSig() {
  const { state, send } = useContractFunction(lensContract, 'postWithSig')
  return { state, send }
}
