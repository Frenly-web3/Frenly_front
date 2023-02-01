import type { IAction } from '@shared/api'
import type { IAddress, TokenTypeEnum, TransferTypeEnum } from '@shared/lib'

export interface IPost {
  id: number
  ownerAddress: IAddress
  postType: TokenTypeEnum
  transactionHash: string
  transferType: TransferTypeEnum
  creationDate: string
  originalPost: number
  isMirror: boolean
  mirrorDescription: string
  actions: IAction[]
}
