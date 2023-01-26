import type { IAddress } from '@shared/lib'

export interface IUser {
  id: number
  walletAddress: IAddress
  totalFollowers: number
  totalSubscribers: number
}
