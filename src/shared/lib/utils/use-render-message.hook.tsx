import { useCallback } from 'react'

import { TransferTypeEnum } from '../enums'

export const useRenderMessage = () => {
  return useCallback(
    ({
      from,
      postType,
      itemType = 'nft',
    }: {
      from: string
      postType: TransferTypeEnum
      itemType?: 'nft' | 'token'
    }) => {
      let message
      const messageTypeClone =
        from == '0x0000000000000000000000000000000000000000'
          ? TransferTypeEnum.MINT
          : postType

      switch (messageTypeClone) {
        case TransferTypeEnum.MINT:
          message = '🎉 Minted a new '
          break
        case TransferTypeEnum.RECEIVE:
          message = '📤 Received '
          break
        case TransferTypeEnum.SEND:
          message = '📤 Sent '
          break
        default:
          break
      }

      switch (itemType) {
        case 'nft':
          message += `NFT`

          break
        case 'token':
          message += 'tokens'
          break
        default:
          break
      }

      return `${message} `
    },
    []
  )
}
