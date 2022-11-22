import { useBlockchain } from './use-blockchain.hook'

export function useGetWalletAddress({ tokenId }: { tokenId: string }) {
  const { useCall, contracts, ChainId } = useBlockchain()

  const { value, error } =
    useCall(
      {
        contract: contracts.lensContract,
        method: 'ownerOf',
        args: [tokenId],
      },
      { chainId: ChainId.Mumbai }
    ) ?? {}

  if (error) {
    console.error(error.message)
    return
  }
  return value ? value[0] : null
}
