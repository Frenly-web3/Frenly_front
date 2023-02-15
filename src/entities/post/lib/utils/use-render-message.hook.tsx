/* eslint-disable sonarjs/cognitive-complexity */
import { from } from '@apollo/client'
import type { IAddress } from '@shared/lib'
import { TransferTypeEnum, useUserName } from '@shared/lib'
import Link from 'next/link'
import { useMemo } from 'react'

export interface IuseRenderMessageContent {
  from: IAddress
  to: IAddress
  postType: TransferTypeEnum
  contractAddress: IAddress
  countActions: number
  amountInCrypto: string
  saleCryptoSymbol?: string
  amountInUsd: string
}

export const useRenderMessage = ({
  from,
  to,
  postType,
  contractAddress,
  countActions,
  amountInCrypto,
  saleCryptoSymbol,
  amountInUsd,
}: IuseRenderMessageContent) => {
  const { data: formatedContractAddress } = useUserName({
    address: contractAddress as IAddress,
    with0x: true,
  })

  const { data: formatedfrom } = useUserName({
    address: from,
    with0x: true,
  })

  const { data: formatedTo } = useUserName({
    address: to,
    with0x: true,
  })

  return useMemo(() => {
    switch (postType) {
      case TransferTypeEnum.MINT:
        return (
          <div className="font-normal">
            🎉 Minted a new NFT{countActions > 1 ? 'S' : ''} from smart contract{' '}
            <a
              target="_blank"
              className="text-main"
              rel="noreferrer"
              href={`https://etherscan.io/address/${contractAddress}`}
            >
              {formatedContractAddress}
            </a>
          </div>
        )
      case TransferTypeEnum.RECEIVE:
        return (
          <div className="font-normal">
            📥 Received NFT{countActions > 1 ? 'S' : ''} from{' '}
            <Link className="text-main" rel="noreferrer" href={`/profile/${from}`}>
              {formatedfrom}
            </Link>
          </div>
        )
      case TransferTypeEnum.SEND:
        return (
          <div className="font-normal">
            📤 Sent NFT{countActions > 1 ? 'S' : ''} to{' '}
            <Link className="text-main" rel="noreferrer" href={`/profile/${to}`}>
              {formatedTo}
            </Link>
          </div>
        )
      case TransferTypeEnum.BURN:
        return (
          <div className="font-normal">
            🔥Burned NFT{countActions > 1 ? 'S' : ''} on the smart contract{' '}
            <a
              target="_blank"
              className="text-main"
              rel="noreferrer"
              href={`https://etherscan.io/address/${contractAddress}`}
            >
              {formatedContractAddress}
            </a>
          </div>
        )
      case TransferTypeEnum.SOLD:
        return (
          <div className="font-normal">
            🛒 just sold {countActions > 1 ? countActions : ''} NFT
            {countActions > 1 ? 'S' : ''} on OpenSea for{' '}
            <span className="font-semibold">
              {amountInCrypto} {saleCryptoSymbol} (${amountInUsd})
            </span>
          </div>
        )
      case TransferTypeEnum.BOUGHT:
        return (
          <div className="font-normal">
            🛒 just bought {countActions > 1 ? countActions : ''} NFT
            {countActions > 1 ? 'S' : ''} on OpenSea for{' '}
            <span className="font-semibold">
              {amountInCrypto} {saleCryptoSymbol} (${amountInUsd})
            </span>
          </div>
        )
      default:
        return <></>
    }
  }, [
    contractAddress,
    formatedContractAddress,
    formatedTo,
    formatedfrom,
    from,
    postType,
    to,
  ])
}
