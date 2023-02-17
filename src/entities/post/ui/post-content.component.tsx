import type { IAddress } from '@shared/lib'
import React from 'react'

import { useRenderMessage } from '../lib'
import { IPost } from '../model'

interface IPostContentProperties extends IPost  {
  
}

export const PostContent = (props: IPostContentProperties) => {
  const {
    actions, mirrorDescription, transferType
  } = props

  

  const renderMessage = useRenderMessage({
    contractAddress: actions[0]?.community.contractAddress as IAddress,
    from: actions[0]?.fromAddress as IAddress,
    postType: transferType,
    to:actions[0]?.toAddress as IAddress,
    countActions: actions.length,
    amountInCrypto: actions[0]?.amountInCrypto as string,
    saleCryptoSymbol: actions[0]?.saleCryptoSymbol,
    amountInUsd: actions[0]?.amountInUsd as string,
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
