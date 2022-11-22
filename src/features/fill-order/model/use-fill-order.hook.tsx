import { ETHEREUM_ADDRESS, TokenTypeEnum } from '@shared/lib'
import type { SignedNftOrderV4, SwappableAssetV4 } from '@traderxyz/nft-swap-sdk'
import { NftSwapV4 } from '@traderxyz/nft-swap-sdk'
import { useCallback } from 'react'
import { useBlockchain } from 'src/blockchain'

interface ICreateOrderInput {
  tokenAddressTaker?: string
  tokenType: TokenTypeEnum
  tokenId: string
  price: string
  signedOrder: SignedNftOrderV4
}

export const useFillOrder = ({
  tokenAddressTaker = ETHEREUM_ADDRESS,
  tokenId,
  tokenType,
  price,
  signedOrder,
}: ICreateOrderInput) => {
  const { account, signer, library, switchNetwork, ChainId } = useBlockchain()
  return {
    cancelOrder: useCallback(async () => {
      try {
        await switchNetwork(ChainId.Mainnet)

        const takerOrder: SwappableAssetV4 = {
          tokenAddress: tokenAddressTaker,
          amount: price,
          type: TokenTypeEnum.ERC20,
        }

        // @ts-ignore
        const nftSwapSdk = new NftSwapV4(library, signer, ChainId.Mainnet)

        const approvalStatusForMaker = await nftSwapSdk.loadApprovalStatus(
          takerOrder,
          account as string
        )

        if (!approvalStatusForMaker.contractApproved) {
          const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
            takerOrder,
            account as string
          )
          const approvalTxReceipt = await approvalTx.wait()
          console.log(approvalTxReceipt)
        }

        const fillTx = await nftSwapSdk.fillSignedOrder(signedOrder)
        const fillTxReceipt = await nftSwapSdk.awaitTransactionHash(fillTx.hash)
        console.log(fillTxReceipt)
      } catch {
      } finally {
        await switchNetwork(ChainId.Mumbai)
      }
    }, []),
    fillOrder: useCallback(async () => {
      try {
        await switchNetwork(ChainId.Mainnet)

        const takerOrder: SwappableAssetV4 = {
          tokenAddress: tokenAddressTaker,
          amount: price,
          type: TokenTypeEnum.ERC20,
        }

        // @ts-ignore
        const nftSwapSdk = new NftSwapV4(library, signer, ChainId.Mainnet)

        const approvalStatusForMaker = await nftSwapSdk.loadApprovalStatus(
          takerOrder,
          account as string
        )

        if (!approvalStatusForMaker.contractApproved) {
          const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
            takerOrder,
            account as string
          )
          const approvalTxReceipt = await approvalTx.wait()
          console.log(approvalTxReceipt)
        }

        const fillTx = await nftSwapSdk.fillSignedOrder(signedOrder)
        const fillTxReceipt = await nftSwapSdk.awaitTransactionHash(fillTx.hash)
        console.log(fillTxReceipt)
      } catch {
      } finally {
        await switchNetwork(ChainId.Mumbai)
      }
    }, [
      ChainId.Mainnet,
      ChainId.Mumbai,
      account,
      library,
      price,
      signedOrder,
      signer,
      tokenAddressTaker,
    ]),
  }
}
