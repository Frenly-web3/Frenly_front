import { PostTypeEnum } from '@shared/lib'

export const convertTransferTypeToEnum = (transferType: string) => {
  switch (transferType) {
    case 'RECEIVE': {
      return PostTypeEnum.Received
    }
    case 'SEND': {
      return PostTypeEnum.Send
    }
    case 'MINT': {
      return PostTypeEnum.Minted
    }
    default: {
      throw new Error('Incorrect transfer type')
    }
  }
}
