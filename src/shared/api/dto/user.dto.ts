import type { IAddress, UsernameTypeEnum } from "@shared/lib";

export interface IUserDto {
  id: number;
  walletAddress: IAddress;
  avatar: string | null;
  username: string | null;
  description: string | null;
  totalFollowers: number;
  totalSubscribers: number;
  ensType: UsernameTypeEnum;
}

export interface IUserWalletDto {
  walletAddress: IAddress;

  ensType: UsernameTypeEnum;
}

export type IUserSubscriptionsDto = IAddress[];
