import { UserStatusEnum } from '../enums'

export const useCheckIsOwner = ({ status }: { status: UserStatusEnum }) => {
  return status === UserStatusEnum.Owner
}
