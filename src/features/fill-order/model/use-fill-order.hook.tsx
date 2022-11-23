import { contentApi } from '@shared/api'
import { ETHEREUM_ADDRESS, TokenTypeEnum, useLoaderContext } from '@shared/lib'
import type { SwappableAssetV4 } from '@traderxyz/nft-swap-sdk'
import { NftSwapV4 } from '@traderxyz/nft-swap-sdk'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useBlockchain } from 'src/blockchain'

interface IFillOrderInput {
  tokenAddressTaker?: string
  price: string
  signedOrder: string
  postId: number
  refetchFilteredFeed: () => void
}

export const useFillOrder = ({
  tokenAddressTaker = ETHEREUM_ADDRESS,
  price,
  signedOrder,
  postId,
  refetchFilteredFeed,
}: IFillOrderInput) => {
  const { account, signer, library, switchNetwork, ChainId } = useBlockchain()
  const { setIsLoading } = useLoaderContext()
  const [acceptOrder] = contentApi.useAcceptOrderMutation()
  const [declineOrder] = contentApi.useDeclineOrderMutation()

  return {
    cancelOrder: useCallback(async () => {
      try {
        setIsLoading(true)
        await declineOrder({ id: postId })
        toast.success('The order was successfully deleted', {
          icon: '❌',
        })
      } catch (error) {
        console.log(error)
      } finally {
        refetchFilteredFeed()
        setIsLoading(false)
      }
    }, [postId]),
    fillOrder: useCallback(async () => {
      try {
        setIsLoading(true)
        await switchNetwork(ChainId.Mainnet)

        const takerOrder: SwappableAssetV4 = {
          tokenAddress: tokenAddressTaker,
          amount: price,
          type: TokenTypeEnum.ERC20,
        }

        // @ts-ignore
        const nftSwapSdk = new NftSwapV4(library, signer, ChainId.Mainnet)

        if (tokenAddressTaker !== ETHEREUM_ADDRESS) {
          const approvalStatusForMaker = await nftSwapSdk.loadApprovalStatus(
            takerOrder,
            account as string
          )

          if (!approvalStatusForMaker.contractApproved) {
            const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
              takerOrder,
              account as string
            )
            await approvalTx.wait()
          }
        }

        const parsedSignedOrder = JSON.parse(signedOrder)

        const fillTx = await nftSwapSdk.fillSignedOrder(parsedSignedOrder)
        await nftSwapSdk.awaitTransactionHash(fillTx.hash)

        await acceptOrder({ id: postId })
        refetchFilteredFeed()

        toast.success('You have successfully bought an NFT.', {
          icon: '✨',
        })
      } catch (error: any) {
        if (error.code == 'INSUFFICIENT_FUNDS') {
          toast.error('You don`t have enough ETHs to Buy this NFT.', {
            icon: '😢',
          })
        } else {
          toast.error('Something went wrong. Try again.', {
            icon: '😢',
          })
        }
      } finally {
        await switchNetwork(ChainId.Mumbai)
        setIsLoading(false)
      }
    }, [
      ChainId.Mainnet,
      ChainId.Mumbai,
      account,
      postId,
      price,
      signedOrder,
      tokenAddressTaker,
    ]),
  }
}
