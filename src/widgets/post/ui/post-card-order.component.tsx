import { OrderButton } from '@features/fill-order'
import React from 'react'

import { usePostCardContext } from '../model'

interface IPostCardOrderProperties {}

export const PostCardOrder = (props: IPostCardOrderProperties) => {
  const {} = props
  const { creatorAddress, price, signedObject } = usePostCardContext()
  return (
    <>
      <OrderButton
        creatorOrderAddress={creatorAddress as string}
        price={price as string}
        signedObject={signedObject as string}
      />
    </>
  )
}
