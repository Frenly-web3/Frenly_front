import type {
  IAddress,
  NetworkEnum,
  PostTypeEnum,
  SellerTypeEnum,
  TokenTypeEnum,
} from '@shared/lib'

export interface IPost {
  id: number | null
  date: string | null
  from: IAddress | null
  to: IAddress | null
  postType: PostTypeEnum | null
  txHash: IAddress | null
  network: NetworkEnum | null
  image: string | null
  contractAddress: IAddress | null
  creatorAddress: IAddress
  sellerType: SellerTypeEnum
  nameCollection: string | null
  tokenId: number | string | null
  tokenType: TokenTypeEnum | null
  price: string | null
  signedObject: string | null
}
