import { NetworkEnum, PostTypeEnum, useRenderMessage } from '@shared/lib'
import { useCallback } from 'react'

interface ICreateTwitterPost {
  from: string
  postType: PostTypeEnum
  contractAddress: string
  to: string
  network: NetworkEnum
  txHash: string
  image: string
}
export const useCreateTwitterPost = ({
  from,
  postType,
  contractAddress,
  to,
  network,
  txHash,
  image,
}: ICreateTwitterPost) => {
  const renderMessage = useRenderMessage()
  return useCallback(() => {
    return `https://twitter.com/intent/tweet?hashtags=Frenly,LENS&url=${
      process.env.NEXT_PUBLIC_API_URL
    }token-images/${image}&text=${`I use 👀 Frenly ${renderMessage({
      from: from as string,
      postType: postType as PostTypeEnum,
    })} ${
      from == '0x0000000000000000000000000000000000000000'
        ? contractAddress
        : postType == PostTypeEnum.Received
        ? to
        : from
    } ${
      from !== '0x0000000000000000000000000000000000000000'
        ? postType == PostTypeEnum.Received
          ? 'from'
          : 'to'
        : 'from Smart contract'
    } ${
      from == '0x0000000000000000000000000000000000000000'
        ? contractAddress
        : postType == PostTypeEnum.Received
        ? from
        : to
    }
        Find and post by gm.frenly.cc
        `} ${
      network == NetworkEnum.Ethereum
        ? `https://etherscan.io/tx/${txHash}`
        : `https://mumbai.polygonscan.com/tx/${txHash}`
    }
      `
  }, [])
}
