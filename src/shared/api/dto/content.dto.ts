import type { IAddress, NetworkEnum, TokenTypeEnum, TransferTypeEnum } from '@shared/lib'

export interface IPostDto {
  id: number
  ownerAddress: IAddress
  postType: TokenTypeEnum
  transactionHash: string
  transferType: TransferTypeEnum
  creationDate: string
  originalPost: number
  isMirror: boolean
  mirrorDescription: string
  actions: IAction[]
}

export interface IAction {
  fromAddress: IAddress
  toAddress: IAddress
  tokenId: number | string
  blockchainType: NetworkEnum
  contractAddress: string
  tokenUri: string
  image: string
  tokensAmount: number
}

export interface IFeedRequest {
  take: number
  skip: number
}

export interface ICommunityFeedRequest {
  take: number
  skip: number
  communityId: number | string
}
