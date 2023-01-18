import type { IAddress } from '@shared/lib'

export interface IComment {
  id?: number
  description: string
  creationDate: Date
  updateDate: Date
  creator: ICreator
}

export interface ICreator {
  id?: number
  username?: string
  description?: string
  walletAddress: IAddress
  creationDate?: Date
  updateDate?: Date
}
