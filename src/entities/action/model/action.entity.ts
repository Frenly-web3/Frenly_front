import { ICommunity } from "@entities/community"
import { IAddress, NetworkEnum } from "@shared/lib"

export interface IAction {
  fromAddress: IAddress
  toAddress: IAddress
  tokenId: number | string
  blockchainType: NetworkEnum
  community: ICommunity
  tokenUri: string
  image: string
  tokensAmount: number
  tokenName: string
  amountInCrypto?: string
  amountInUsd?: string
  saleCryptoContractAddress?: string
  saleCryptoSymbol?: string
}
