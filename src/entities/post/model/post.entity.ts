import { IAction } from "@entities/action";
import { IUserWalletDto } from "@shared/api";
import type { TokenTypeEnum, TransferTypeEnum } from "@shared/lib";

export interface IPost {
  id: number;
  owner: IUserWalletDto;
  postType: TokenTypeEnum;
  transactionHash: string;
  transferType: TransferTypeEnum;
  creationDate: string;
  originalPost: number;
  isMirror: boolean;
  mirrorDescription: string;
  actions: IAction[];
}
