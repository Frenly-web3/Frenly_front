import { IAddress } from "@shared/lib";

export interface IUsernameFrenTransformedDto {
  usernames: {
    avatar: string;
    name: string;
    address: IAddress;
  }[];
  hasMore: boolean;
}

export interface IUsernameFrenDto {
  profiles: {
    id: string;
    avatar: string;
    username: string;
    owner: IAddress;
  }[];
}

export interface IBio {
  key: string;
  value: string;
}

export interface IUsernameFrenInfoDto {
  username: string;
  description: string;
  owner: IAddress;
  bios: IBio[];
  avatar: string;
}
export interface IUsernameFrenInfoResponse {
  address: IAddress;
}

export interface IGetUsernameFrenAddressResponse {
  username: string;
}
