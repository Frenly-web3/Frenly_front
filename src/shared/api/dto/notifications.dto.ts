import { IAddress, NotificationTypeEnum } from "@shared/lib";
import { IPostDto } from "./content.dto";
export interface CommentNotificationDto {
  walletAddress: IAddress;
  post: IPostDto;
  comment: string;
}

export interface SubscribeNotificationDto {
  walletAddress: IAddress;
}

export interface LikeNotificationDto {
  walletAddress: string;
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

export interface IGetNotificationsDto  {
  notifications: NotificationDto[]
  totalNotifications: number;
}
export interface IGetNotificationsTransformedDto {
  notifications: NotificationDto[]
  hasMore: boolean;
}
export interface IGetNotificationsMeta {
  response: {
    headers: {
      "Content-Length": string;
    };
  };
}
