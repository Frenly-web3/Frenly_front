import { useBlockchain } from './use-blockchain.hook'

export function useGetWalletProfileId(address: string) {
  const { useCall, contracts, ChainId } = useBlockchain()

  const { value, error } =
    useCall(
      {
        contract: contracts.lensContract,
        method: 'tokenOfOwnerByIndex',
        args: [address, 0],
      },
      // { chainId: ChainId.Mumbai }
      { chainId: ChainId.Mainnet }
    ) ?? {}

  if (error) {
    console.error(error.message)
    return
  }

  return value ? value[0]._hex : null
}
