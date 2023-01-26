import type { IAddress } from '@shared/lib'

export interface ICommunity {
  id: number
  creator: number
  name: string
  contractAddress: IAddress
  membersAmount: number
  description: string
  image: string
}
