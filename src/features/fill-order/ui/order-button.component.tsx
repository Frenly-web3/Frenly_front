import { Button } from '@shared/ui'
import React from 'react'
import { useBlockchain } from 'src/blockchain'

import { useFillOrder } from '../model'

interface IOrderButtonProperties {
  price: string
  creatorOrderAddress: string
  signedOrder: string
  postId: number
  refetchFilteredFeed: () => void
}

export const OrderButton = (props: IOrderButtonProperties) => {
  const { price, creatorOrderAddress, signedOrder, postId, refetchFilteredFeed } = props

  const { account } = useBlockchain()

  const viewerIsCreator = creatorOrderAddress.toLowerCase() === account?.toLowerCase()

  const { cancelOrder, fillOrder } = useFillOrder({
    price,
    signedOrder,
    postId,
    refetchFilteredFeed,
  })

  return (
    <div className="pl-14 h-16 pt-2">
      <Button
        primary={viewerIsCreator}
        onClick={viewerIsCreator ? cancelOrder : fillOrder}
      >
        {(viewerIsCreator
          ? `Cancel the sale`
          : `Buy for ${Number(price)} eth`
        ).toUpperCase()}
      </Button>
    </div>
  )
}
