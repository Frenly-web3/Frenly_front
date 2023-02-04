import type { IAddress, NetworkEnum, TransferTypeEnum } from '@shared/lib'
import React from 'react'

import { useRenderMessage } from '../lib'

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

export const PostContent = (props: IPostContentProperties) => {
  const { messageType, from, to, contractAddress, mirrorDescription } = props

  const renderMessage = useRenderMessage({
    contractAddress: contractAddress as IAddress,
    from,
    postType: messageType,
    to,
  })

  return (
    <div className="py-4">
      <h4 className="text-text font-medium font-text break-words">{renderMessage}</h4>
      {mirrorDescription && (
        <div className="text-text font-normal text-gray-darker mt-1">
          {mirrorDescription}
        </div>
      )}
    </div>
  )
}
