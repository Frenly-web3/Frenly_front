import { IPost } from "@entities/post";
import { IAddress, NotificationTypeEnum } from "@shared/lib";

export interface INotification {
  address: IAddress;
  notificationDate: string;
  notificationType: NotificationTypeEnum;
  post?: IPost;
  comment?: string;
}
