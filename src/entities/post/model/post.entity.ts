import type { NetworkEnum, PostTypeEnum } from '@shared/lib'

export interface IPost {
  creatorLensId: string | null
  lensId: string | null
  id: number | null
  date: string | null
  from: string | null
  to: string | null
  postType: PostTypeEnum | null
  isMirror: boolean | null
  mirrorFrom: string | null
  mirrorFromId: string | null
  mirrorDescription: string | null
  txHash: string | null
  network: NetworkEnum | null
  image: string | null
  contractAddress: string | null
  creatorAddress: string | null
}