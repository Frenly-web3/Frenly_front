import type { NetworkEnum } from '@shared/lib'
import { PostTypeEnum, useRenderMessage } from '@shared/lib'
import { TimeDate } from '@shared/ui'
import React from 'react'

interface IPostContentProperties {
  showDate: boolean
  showAuthor: boolean
  date: string
  isAdmin: boolean
  blockchainType: NetworkEnum
  messageType: PostTypeEnum
  from: string
  to: string
  creatorAddress: string
  contractAddress: string
  mirrorDescription?: string
  image: string | null
  itemType: 'nft' | 'token'
  isMirror: boolean | null
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const PostContent = (props: IPostContentProperties) => {
  const {
    showAuthor,
    date,
    blockchainType,
    messageType,
    from,
    to,
    creatorAddress,
    contractAddress,
    mirrorDescription,
    itemType = 'nft',
    image,
    isMirror,
  } = props

  const renderMessage = useRenderMessage()

  return (
    <div style={{ marginLeft: showAuthor ? 56 : 0 }}>
      {date && <TimeDate date={date} />}

      <h4 className="text-base font-semibold break-words">
        {(creatorAddress === process.env.NEXT_PUBLIC_ADMIN_ADDRESS || isMirror) && (
          <>
            <a
              target="_blank"
              href={
                blockchainType === 'ETHEREUM'
                  ? `https://etherscan.io/address/${
                      messageType == PostTypeEnum.Received ? to : from
                    }`
                  : `https://polygonscan.com/address/${
                      messageType == PostTypeEnum.Received ? to : from
                    }`
              }
              className="text-main"
              rel="noreferrer"
            >
              {from == '0x0000000000000000000000000000000000000000'
                ? `🎉 ${to}`
                : messageType == PostTypeEnum.Received
                ? `📤 ${to}`
                : `📤 ${from}`}
            </a>
            <>
              {' '}
              {from == '0x0000000000000000000000000000000000000000'
                ? `minted a new`
                : messageType == PostTypeEnum.Received
                ? `received`
                : `sent`}
            </>
          </>
        )}
        {creatorAddress !== process.env.NEXT_PUBLIC_ADMIN_ADDRESS &&
          !isMirror &&
          renderMessage({ from, itemType, postType: messageType })}{' '}
        {from !== '0x0000000000000000000000000000000000000000' ? (
          messageType == PostTypeEnum.Received ? (
            <>from&nbsp;</>
          ) : (
            <>to&nbsp;</>
          )
        ) : (
          <>from Smart contract&nbsp;</>
        )}
        <a
          target="_blank"
          href={
            blockchainType === 'ETHEREUM'
              ? `https://etherscan.io/address/${
                  from == '0x0000000000000000000000000000000000000000'
                    ? contractAddress
                    : from
                }`
              : `https://polygonscan.com/address/${
                  from == '0x0000000000000000000000000000000000000000'
                    ? contractAddress
                    : from
                }`
          }
          className="text-main"
          rel="noreferrer"
        >
          {from == '0x0000000000000000000000000000000000000000'
            ? contractAddress
            : messageType == PostTypeEnum.Received
            ? from
            : to}
        </a>
      </h4>
      {mirrorDescription && (
        <div className="text-base font-normal text-gray-darker mt-1">
          {mirrorDescription}
        </div>
      )}
      <div className="relative max-h-96 rounded-lg overflow-hidden mt-1">
        {image && image !== null ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}token-images/${image}`}
            alt="image"
            className="m-auto"
          />
        ) : (
          <img
            src={'/assets/images/eyes.png'}
            alt="image"
            className="m-auto mt-30 mb-30"
          />
        )}
      </div>
    </div>
  )
}
