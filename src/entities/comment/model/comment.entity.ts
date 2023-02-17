import type { IAddress } from '@shared/lib'

export interface IComment {
  id: number
  description: string
  creator: IAddress
}