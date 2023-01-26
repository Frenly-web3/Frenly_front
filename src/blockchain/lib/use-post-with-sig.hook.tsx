import { useBlockchain } from './use-blockchain.hook'

export function usePostWithSig() {
  const { contracts, useContractFunction } = useBlockchain()

  const { state, send } = useContractFunction(contracts.lensContract, 'postWithSig')
  return { state, send }
}
