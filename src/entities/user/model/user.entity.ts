import type { RoleEnum, UserStatusEnum } from '@shared/lib'

export interface IUser {
  address: string | null
  lensId: string | null
  role: RoleEnum
  avatar: string | null
  name: string | null
  description: string | null
  isPaidSubscription: boolean | null
  totalFollowers: number | null
  status: UserStatusEnum
}
