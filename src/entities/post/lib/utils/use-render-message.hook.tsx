import type { IAddress } from '@shared/lib'
import { TransferTypeEnum, useUserName } from '@shared/lib'
import Link from 'next/link'
import { useMemo } from 'react'

export const useRenderMessage = ({
  from,
  to,
  postType,
  contractAddress,
}: {
  from: IAddress
  to: IAddress
  postType: TransferTypeEnum
  contractAddress: IAddress
}) => {
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
          <>
            🎉 Minted a new NFT from smart contract{' '}
            <a
              target="_blank"
              className="text-main"
              rel="noreferrer"
              href={`https://etherscan.io/address/${contractAddress}`}
            >
              {formatedContractAddress}
            </a>
          </>
        )
      case TransferTypeEnum.RECEIVE:
        return (
          <>
            📤 Received NFT from{' '}
            <Link className="text-main" rel="noreferrer" href={`/profile/${from}`}>
              {formatedfrom}
            </Link>
          </>
        )
      case TransferTypeEnum.SEND:
        return (
          <>
            📤 Sent NFT to{' '}
            <Link className="text-main" rel="noreferrer" href={`/profile/${to}`}>
              {formatedTo}
            </Link>
          </>
        )
      case TransferTypeEnum.BURN:
        return (
          <>
            🔥Burned NFT on the smart contract{' '}
            <a
              target="_blank"
              className="text-main"
              rel="noreferrer"
              href={`https://etherscan.io/address/${contractAddress}`}
            >
              {formatedContractAddress}
            </a>
          </>
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
