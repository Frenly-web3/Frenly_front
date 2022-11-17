import { useBlockchain } from './use-blockchain.hook'

export function useGetWalletAddress({ tokenId }: { tokenId: string }) {
  const { useCall, contracts } = useBlockchain()

  const { value, error } =
    useCall({
      contract: contracts.lensContract,
      method: 'ownerOf',
      args: [tokenId],
    }) ?? {}

  if (error) {
    console.error(error.message)
    return
  }
  return value ? value[0] : null
}
