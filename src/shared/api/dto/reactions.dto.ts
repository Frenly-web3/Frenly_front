import { IUserWalletDto } from './user.dto'

export interface IReactionsDto {
  likes: number
  repostsAmount: number
  comments: ICommentsDto[]
  commentsAmount: number
}

export interface ICommentsDto {
  comments: IComment[]
  commentsRemaining: number
  hasMore: boolean
}

interface IComment {
  id: number
  description: string
  creator: IUserWalletDto
}
// interface ICreator {
//   id: number
//   description: string
//   walletAddress: IAddress
// }
