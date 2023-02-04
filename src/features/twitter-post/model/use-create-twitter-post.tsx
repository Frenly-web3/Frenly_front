import { useRenderMessage } from '@entities/post'
import type { IAddress, NetworkEnum, TransferTypeEnum } from '@shared/lib'
import { useCallback } from 'react'

interface ICreateTwitterPost {
  from: string
  postType: TransferTypeEnum
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
  image,
}: ICreateTwitterPost) => {
  const renderMessage = useRenderMessage({
    contractAddress: contractAddress as IAddress,
    from: from as IAddress,
    postType,
    to: to as IAddress,
  })
  return useCallback(() => {
    return `https://twitter.com/intent/tweet?hashtags=Frenly,LENS&url=${process.env.NEXT_PUBLIC_API_URL}token-images/${image}&text=I use 👀 Frenly${renderMessage}`
  }, [image, renderMessage])
}
