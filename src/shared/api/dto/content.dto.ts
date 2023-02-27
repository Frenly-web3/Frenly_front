import type {
  IAddress,
  NetworkEnum,
  TokenTypeEnum,
  TransferTypeEnum,
} from "@shared/lib";

export interface IPostDto {
  id: number;
  ownerAddress: IAddress;
  postType: TokenTypeEnum;
  transactionHash: string;
  transferType: TransferTypeEnum;
  creationDate: string;
  originalPost: number;
  isMirror: boolean;
  mirrorDescription: string;
  actions: IActionDto[];
}

export interface IActionDto {
  fromAddress: IAddress;
  toAddress: IAddress;
  tokenId: number | string;
  blockchainType: NetworkEnum;
  community: string;
  tokenUri: string;
  image: string;
  tokensAmount: number;
  tokenName: string;
  amountInCrypto?: number;
  amountInUsd?: number;
  saleCryptoContractAddress?: string;
  saleCryptoSymbol?: string;
}

export interface IFeedRequest {
  take: number;
  skip: number;
}

export interface ICommunityFeedRequest {
  take: number;
  skip: number;
  communityId: number | string;
}

export interface IWalletAddressFeedRequest {
  take: number;
  skip: number;
  address: string;
}

export interface IWalletAddressFeedDto {
  totalPosts: number
  posts: IPostDto[]
}
