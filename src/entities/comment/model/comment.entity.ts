export interface IComment {
  id: number
  description: string
  creationDate: Date
  updateDate: Date
  creator: ICreator
}

export interface ICreator {
  id: number
  nonce: null
  avatar: null
  username: null
  description: null
  walletAddress: string
  hasLensProfile: boolean
  role: number
  creationDate: Date
  updateDate: Date
}
