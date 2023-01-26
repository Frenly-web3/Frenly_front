import type { IAddress } from '@shared/lib'

export interface ICommunityDto {
  id: number
  creator: number
  name: string
  contractAddress: IAddress
  membersAmount: number
  description: string
  image: string
}
