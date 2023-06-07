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

export interface IUsernameFrenInfoDto {}
export interface IUsernameFrenInfoResponse {
  address: IAddress;
}
