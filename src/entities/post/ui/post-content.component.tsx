// eslint-disable-next-line boundaries/element-types
import { useUserName } from '@entities/user'
import type { IAddress, NetworkEnum } from '@shared/lib'
import { TransferTypeEnum, useRenderMessage } from '@shared/lib'
import Link from 'next/link'
import React from 'react'

interface IPostContentProperties {
  showDate: boolean
  showAuthor: boolean
  date: string
  blockchainType: NetworkEnum
  messageType: TransferTypeEnum
  from: IAddress
  to: IAddress
  creatorAddress: string
  contractAddress: string
  mirrorDescription?: string
  itemType: 'nft' | 'token'
  isMirror: boolean | null
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const PostContent = (props: IPostContentProperties) => {
  const {
    blockchainType,
    messageType,
    from,
    to,
    creatorAddress,
    contractAddress,
    mirrorDescription,
    itemType = 'nft',
    isMirror,
  } = props

  const renderMessage = useRenderMessage()

  const { data: formatedContractAddress } = useUserName({
    address: contractAddress as `0x${string}`,
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

  console.log('asdjiasosjfojasrirofrjoa', from, formatedfrom)
  return (
    <div className="py-4">
      <h4 className="text-text font-medium font-text break-words">
        {(creatorAddress === process.env.NEXT_PUBLIC_ADMIN_ADDRESS || isMirror) && (
          <>
            <a
              target="_blank"
              href={
                blockchainType === 'ETHEREUM'
                  ? `https://etherscan.io/address/${
                      messageType == TransferTypeEnum.RECEIVE ? to : from
                    }`
                  : `https://polygonscan.com/address/${
                      messageType == TransferTypeEnum.RECEIVE ? to : from
                    }`
              }
              className="text-main"
              rel="noreferrer"
            >
              {from == '0x0000000000000000000000000000000000000000'
                ? `🎉 ${formatedContractAddress}`
                : messageType == TransferTypeEnum.RECEIVE
                ? `📤 ${formatedTo}`
                : `📤 ${formatedfrom}`}
            </a>
            <>
              {' '}
              {from == '0x0000000000000000000000000000000000000000'
                ? `minted a new`
                : messageType == TransferTypeEnum.RECEIVE
                ? `received`
                : `sent`}{' '}
              NFT
            </>
          </>
        )}
        {creatorAddress !== process.env.NEXT_PUBLIC_ADMIN_ADDRESS &&
          !isMirror &&
          renderMessage({ from: from as string, itemType, postType: messageType })}{' '}
        {from !== '0x0000000000000000000000000000000000000000' ? (
          messageType == TransferTypeEnum.RECEIVE ? (
            <>from&nbsp;</>
          ) : (
            <>to&nbsp;</>
          )
        ) : (
          <>from Smart contract&nbsp;</>
        )}
        <Link
          className="text-main"
          rel="noreferrer"
          href={`/profile/${
            from == '0x0000000000000000000000000000000000000000'
              ? contractAddress
              : messageType == TransferTypeEnum.RECEIVE
              ? from
              : to
          }`}
        >
          {from == '0x0000000000000000000000000000000000000000'
            ? formatedContractAddress
            : messageType == TransferTypeEnum.RECEIVE
            ? formatedfrom
            : formatedTo}
        </Link>
      </h4>
      {mirrorDescription && (
        <div className="text-text font-normal text-gray-darker mt-1">
          {mirrorDescription}
        </div>
      )}
    </div>
  )
}
