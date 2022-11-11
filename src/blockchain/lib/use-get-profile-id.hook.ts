import { useBlockchain } from './use-blockchain.hook'

export function useGetWalletProfileId(address: String) {
  const { useCall, contracts } = useBlockchain()

  const { value, error } =
    useCall({
      contract: contracts.lensContract,
      method: 'tokenOfOwnerByIndex',
      args: [address, 0],
    }) ?? {}

  if (error) {
    console.error(error.message)
    return
  }

  return value ? value[0]._hex : null
}
