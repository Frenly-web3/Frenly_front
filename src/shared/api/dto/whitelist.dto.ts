import { IAddress } from "@shared/lib";

export interface IWhitelistedUsersDto{
  users: Array<{ address: IAddress }>
}