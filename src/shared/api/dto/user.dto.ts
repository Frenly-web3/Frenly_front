import type { IAddress } from '@shared/lib'

export interface IUserDto {
  id: number
  walletAddress: IAddress
  avatar: string | null
  username: string | null
  description: string | null
  totalFollowers: number
  totalSubscribers: number
}

export type IUserSubscriptionsDto = IAddress[] 