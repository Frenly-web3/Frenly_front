import { IUserWalletDto } from "@shared/api";

export interface IComment {
  id: number;
  description: string;
  creator: IUserWalletDto;
}
