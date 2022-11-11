import type { RoleEnum } from '@shared/lib'

export interface IUser {
  address: string | null
  lensId: string | null
  role: RoleEnum | null
  avatar: string | null
  name: string | null
  description: string | null
  isPaidSubscription: boolean | null
}
