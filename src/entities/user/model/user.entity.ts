import type { IAddress } from "@shared/lib";

export interface IUser {
  id: number;
  walletAddress: IAddress;
  totalFollowers: number;
  totalSubscribers: number;
}

export interface IUserENS {
  name?: string;
  description?: string;
  header?: string;
  avatar?: string;
  social: [string, string | undefined][];
}
