import { NotificationTypeEnum } from "@shared/lib";
import { useMemo } from "react";

import { TNotificationIcons } from "../notification-icon.types";

export interface IuseNotificationTypeInfoResult {
  icon: TNotificationIcons;
  content: string;
  color: string;
}

export const useNotificationTypeInfo = ({
  notificationType,
}: {
  notificationType: NotificationTypeEnum;
}): IuseNotificationTypeInfoResult => {
  return useMemo(() => {
    switch (notificationType) {
      case NotificationTypeEnum.LIKE: {
        return {
          icon: "favorite",
          content: "liked your NFT",
          color: "bg-[#FF002B]",
        };
      }
      case NotificationTypeEnum.FOLLOW: {
        return {
          icon: "add",
          content: "followed you",
          color: "bg-[#135EDD]",
        };
      }
      case NotificationTypeEnum.COMMENT: {
        return {
          icon: "chat",
          content: "commented your transaction:",
          color: "bg-[#D18E2A]",
        };
      }
      case NotificationTypeEnum.MENTION: {
        return {
          icon: "alternate_email",
          content: "mentioned you:",
          color: "bg-[#135EDD]",
        };
      }
      case NotificationTypeEnum.COMMENT_ON_COMMENTED_POST: {
        return {
          icon: "handshake",
          content: "left a comment on the post you commented on: ",
          color: "bg-[#D18E2A]",
        };
      }
      default: {
        return {
          icon: "",
          content: "",
          color: "",
        };
      }
    }
  }, [notificationType]);
};
