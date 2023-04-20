import { IAddress } from "@shared/lib";

export interface IUsernameTransformedDto {
  usernames: {
    address: IAddress;
    name: string;
  }[];
  hasMore: boolean;
}

export interface IUsernameDto {
  domains: {
    owner: {
      id: IAddress;
    };
    name: string;
  }[];
}

export interface IUsernameRequest {
  usernamePart: string;
  skip: number;
}
