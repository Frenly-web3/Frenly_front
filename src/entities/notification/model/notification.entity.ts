import { IPost } from "@entities/post";
import { IUserWalletDto } from "@shared/api";
import { NotificationTypeEnum } from "@shared/lib";

export interface INotification {
  notificationOwner: IUserWalletDto;
  notificationDate: string;
  notificationType: NotificationTypeEnum;
  post?: IPost;
  comment?: string;
}
