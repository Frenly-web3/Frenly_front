import type { IAddress } from '@shared/lib'

export interface IReactionsDto {
  likes: number
  repostsAmount: number
  comments: IComment[]
  commentsAmount: number
}

interface IComment {
  id: number
  description: string
  creationDate: Date
  updateDate: Date
  creator: ICreator
}

interface ICreator {
  id: number
  description: string
  walletAddress: IAddress
}
