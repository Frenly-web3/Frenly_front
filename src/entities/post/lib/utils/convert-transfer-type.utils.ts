import { TransferTypeEnum } from '@shared/lib'

export const convertTransferTypeToEnum = (transferType: string) => {
  switch (transferType) {
    case 'RECEIVE': {
      return TransferTypeEnum.RECEIVE
    }
    case 'SEND': {
      return TransferTypeEnum.SEND
    }
    case 'MINT': {
      return TransferTypeEnum.MINT
    }
    default: {
      console.error('Incorrect post type')
      return TransferTypeEnum.RECEIVE
    }
  }
}
