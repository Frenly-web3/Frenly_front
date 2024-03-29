import type {
  IAddress,
  ImageProviderEnum,
  NetworkEnum,
  TokenTypeEnum,
  TransferTypeEnum,
} from "@shared/lib";
import { IUserWalletDto } from "./user.dto";

export interface IPostDto {
  id: number;
  owner: IUserWalletDto;
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
  fileExtension: string | null;
  fileProvider: ImageProviderEnum;
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
  totalPosts: number;
  posts: IPostDto[];
}
