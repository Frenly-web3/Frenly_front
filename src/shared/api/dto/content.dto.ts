import type { IAddress } from '@shared/lib'

export interface IPostDto {
  creationDate: Date
  postType: any
  id: number
  isMirror: boolean
  mirrorDescription: string | null
  actions: IAction[]
}

interface IAction {
  blockchainType: any
  transferType: any
  fromAddress: IAddress
  toAddress: IAddress
  contractAddress: IAddress
  tokenId: number
  tokensAmount: number
  tokenUri: string
  transactionHash: IAddress
  image: string
}

export interface IFeedRequest {
  take: number
  skip: number
}

export interface ICommunityFeedRequest {
  take: number
  skip: number
  communityId: number
}
