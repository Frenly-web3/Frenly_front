import { useCallback } from 'react'

import { PostTypeEnum } from '../enums'

export const useRenderMessage = () => {
  return useCallback(
    ({
      from,
      postType,
      itemType = 'nft',
    }: {
      from: string
      postType: PostTypeEnum
      itemType?: 'nft' | 'token'
    }) => {
      let message
      const messageTypeClone =
        from == '0x0000000000000000000000000000000000000000'
          ? PostTypeEnum.Minted
          : postType

      switch (messageTypeClone) {
        case PostTypeEnum.Minted:
          message = '🎉 Minted a new '
          break
        case PostTypeEnum.Received:
          message = '📤 Received '
          break
        case PostTypeEnum.Send:
          message = '📤 Sent '
          break
        default:
          break
      }

      switch (itemType) {
        case 'nft':
          message += `${postType !== PostTypeEnum.Minted ? 'an' : ''} NFT`

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
