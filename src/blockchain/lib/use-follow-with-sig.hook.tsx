import { useBlockchain } from './use-blockchain.hook'

export function useFollowWithSig() {
  const { contracts, useContractFunction } = useBlockchain()

  const { state, send } = useContractFunction(contracts.lensContract, 'followWithSig')
  return { state, send }
}
