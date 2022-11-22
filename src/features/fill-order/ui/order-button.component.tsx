import { Button } from '@shared/ui'
import React from 'react'
import { useBlockchain } from 'src/blockchain'

interface IOrderButtonProperties {
  price: string
  creatorOrderAddress: string
  signedObject: string
}

export const OrderButton = (props: IOrderButtonProperties) => {
  const { price, creatorOrderAddress } = props

  const { account } = useBlockchain()

  const viewerIsCreator = creatorOrderAddress.toLowerCase() === account?.toLowerCase()

  return (
    <div className="pl-14 h-16 pt-4">
      <Button primary={viewerIsCreator}>
        {viewerIsCreator ? `Cancel the sale` : `Buy for ${price} eth`}
      </Button>
    </div>
  )
}
