import { useBlockchain } from './use-blockchain.hook'

export function useSetDispatcherWithSig() {
  const { contracts, useContractFunction } = useBlockchain()

  const { state, send } = useContractFunction(
    contracts.lensContract,
    'setDispatcherWithSig'
  )
  return { state, send }
}
