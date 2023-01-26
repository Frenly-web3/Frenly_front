import { useBlockchain } from './use-blockchain.hook'

export function useCommentWithSig() {
  const { contracts, useContractFunction } = useBlockchain()

  const { state, send } = useContractFunction(contracts.lensContract, 'commentWithSig')
  return { state, send }
}
