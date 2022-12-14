import { OrderButton } from '@features/fill-order'
import React from 'react'

import { usePostCardContext } from '../model'

interface IPostCardOrderProperties {
  refetchFilteredFeed: () => void
}

export const PostCardOrder = (props: IPostCardOrderProperties) => {
  const { refetchFilteredFeed } = props
  const { creatorAddress, price, signedObject, id } = usePostCardContext()
  return (
    <>
      <OrderButton
        creatorOrderAddress={creatorAddress as string}
        price={price as string}
        signedOrder={signedObject as string}
        postId={id as number}
        refetchFilteredFeed={refetchFilteredFeed}
      />
    </>
  )
}
