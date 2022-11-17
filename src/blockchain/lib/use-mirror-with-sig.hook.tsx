import { useBlockchain } from './use-blockchain.hook'

export function useMirrorWithSig() {
  const { contracts, useContractFunction } = useBlockchain()

  const { state, send } = useContractFunction(contracts.lensContract, 'mirrorWithSig')
  return { state, send }
}
