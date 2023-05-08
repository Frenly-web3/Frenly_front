import type { IAddress, UsernameTypeEnum } from "@shared/lib";

export interface IUser {
  id: number;
  walletAddress: IAddress;
  totalFollowers: number;
  totalSubscribers: number;
  usernameType?: UsernameTypeEnum
}

export interface IUserENS {
  name?: string;
  description?: string;
  header?: string;
  avatar?: string;
  social: [string, string | undefined][];
}
