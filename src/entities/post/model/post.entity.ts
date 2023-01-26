import type {
  NetworkEnum,
  PostTypeEnum,
  SellerTypeEnum,
  TokenTypeEnum,
} from '@shared/lib'

export interface IPost {
  // creatorLensId: string | null
  // lensId: string | null
  id: number | null
  date: string | null
  from: string | null
  to: string | null
  postType: PostTypeEnum | null
  // isMirror: boolean | null
  // mirrorFrom: string | null
  // mirrorFromId: string | null
  // mirrorDescription: string | null
  txHash: string | null
  network: NetworkEnum | null
  image: string | null
  contractAddress: string | null
  creatorAddress: string
  sellerType: SellerTypeEnum
  nameCollection: string | null
  tokenId: number | string | null
  tokenType: TokenTypeEnum | null
  price: string | null
  signedObject: string | null
}
