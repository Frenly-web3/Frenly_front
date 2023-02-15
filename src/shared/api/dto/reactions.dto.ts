import type { IAddress } from '@shared/lib'

export interface IReactionsDto {
  likes: number
  repostsAmount: number
  comments: ICommentsDto[]
  commentsAmount: number
}

export interface ICommentsDto {
  comments: IComment[]
  commentsRemaining: number
}

interface IComment {
  id: number
  description: string
  creator: IAddress
}
// interface ICreator {
//   id: number
//   description: string
//   walletAddress: IAddress
// }
