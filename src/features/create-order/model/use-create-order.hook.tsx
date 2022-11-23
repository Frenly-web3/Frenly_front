import { contentApi } from '@shared/api'
import { ETHEREUM_ADDRESS, TokenTypeEnum, useLoaderContext } from '@shared/lib'
import type { SwappableAssetV4 } from '@traderxyz/nft-swap-sdk'
import { NftSwapV4 } from '@traderxyz/nft-swap-sdk'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useBlockchain } from 'src/blockchain'

interface ICreateOrderInput {
  collectionName: string
  tokenAddressMaker: string
  tokenAddressTaker?: string
  tokenType: TokenTypeEnum
  tokenId: string
  image: string
  closeForm: () => void
}

export const useCreateOrder = ({
  tokenAddressMaker,
  tokenAddressTaker = ETHEREUM_ADDRESS,
  tokenId,
  tokenType,
  collectionName,
  closeForm,
  image,
}: ICreateOrderInput) => {
  const [price, setPrice] = useState('')

  const { account, signer, library, switchNetwork, ChainId } = useBlockchain()

  const [createSellOrder] = contentApi.useCreateSellOrderMutation()

  const { setIsLoading } = useLoaderContext()
  useEffect(() => {
    if (Number.isNaN(Number(price)) && price.length > 0) {
      setPrice('')
    }
  }, [price])

  return {
    price,
    setPrice,
    createOrder: useCallback(async () => {
      try {
        setIsLoading(true)
        await switchNetwork(ChainId.Mainnet)
        const makerOrderERC721: SwappableAssetV4 = {
          tokenAddress: tokenAddressMaker,
          tokenId,
          type: TokenTypeEnum.ERC721,
        }

        const makerOrderERC1155: SwappableAssetV4 = {
          tokenAddress: tokenAddressMaker,
          tokenId,
          type: TokenTypeEnum.ERC1155,
          amount: '1',
        }

        const makerOrder =
          tokenType == TokenTypeEnum.ERC1155 ? makerOrderERC1155 : makerOrderERC721

        const takerOrder: SwappableAssetV4 = {
          tokenAddress: tokenAddressTaker,
          amount: (Number(price) * 10e17).toString(),
          type: TokenTypeEnum.ERC20,
        }
        // @ts-ignore
        const nftSwapSdk = new NftSwapV4(library, signer, ChainId.Mainnet)

        const approvalStatusForMaker = await nftSwapSdk.loadApprovalStatus(
          makerOrder,
          account as string
        )

        if (!approvalStatusForMaker.contractApproved) {
          const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
            makerOrder,
            account as string
          )
          await approvalTx.wait()
        }
        // @ts-ignore
        const order = nftSwapSdk.buildOrder(makerOrder, takerOrder, account as string)

        const signedOrder = await nftSwapSdk.signOrder(order)

        await createSellOrder({
          collectionName,
          image,
          price,
          signedObject: JSON.stringify(signedOrder),
          walletAddress: account as string,
        }).unwrap()

        toast('You successfully created order.', {
          icon: '✨',
        })
        closeForm()
        setPrice('')
      } catch (error) {
        toast.error('Something went wrong. Try again.', {
          icon: '😢',
        })
        console.log(error)
      } finally {
        await switchNetwork(ChainId.Mumbai)
        setIsLoading(false)
      }
    }, [
      account,
      price,
      signer,
      tokenAddressMaker,
      tokenAddressTaker,
      tokenId,
      tokenType,
    ]),
  }
}
