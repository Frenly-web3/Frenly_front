import type { IAddress } from '@shared/lib'

export interface ICommunity {
  id: number;
  name: string;
  contractAddress: IAddress;
  membersAmount: number ; 
  description: string ;
  image: string ;
  contractName: string ;
  contractSymbol: string ;
  externalUrl: string ;
  twitterUserName: string ;
  discordUrl: string ;
  openseaCollectionName: string ;
}
