import { NotificationTypeEnum } from "@shared/lib";
import { IPostDto } from "./content.dto";
import { IUserWalletDto } from "./user.dto";
export interface CommentNotificationDto {
  creator: IUserWalletDto;
  post: IPostDto;
  comment: string;
}

export interface SubscribeNotificationDto {
  creator: IUserWalletDto;
}

export interface LikeNotificationDto {
  creator: IUserWalletDto;
  post: IPostDto;
}

export interface NotificationDto {
  actionType: NotificationTypeEnum;
  actionDate: string;
  actionData: LikeNotificationDto &
    CommentNotificationDto &
    SubscribeNotificationDto;
}

export interface IGetNotificationsRequest {
  take: number;
  skip: number;
}

export interface IGetNotificationsDto {
  notifications: NotificationDto[];
  totalNotifications: number;
}
export interface IGetNotificationsTransformedDto {
  notifications: NotificationDto[];
  hasMore: boolean;
}
export interface IGetNotificationsMeta {
  response: {
    headers: {
      "Content-Length": string;
    };
  };
}
