import type { NetworkEnum, PostTypeEnum } from '@shared/lib'
import { IconButton } from '@shared/ui'
import React from 'react'

import { useCreateTwitterPost } from '../model'

interface ITwitterButton {
  image: string | null
  from: string | null
  contractAddress: string | null
  postType: PostTypeEnum | null
  to: string | null
  network: NetworkEnum | null
  txHash: string | null
}

export const TwitterButton = (props: ITwitterButton) => {
  const { image, from, contractAddress, postType, to, network, txHash } = props

  const createTwitterPost = useCreateTwitterPost({
    contractAddress: contractAddress as string,
    from: from as string,
    network: network as NetworkEnum,
    postType: postType as PostTypeEnum,
    to: to as string,
    txHash: txHash as string,
    image: image as string,
  })

  return (
    <a target="_blank" href={createTwitterPost()} rel="noreferrer">
      <IconButton image="/assets/icons/twitter.svg" />
    </a>
  )
}
