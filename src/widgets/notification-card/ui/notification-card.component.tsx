import { IAction } from "@entities/action";
import {
  INotification,
  Notification,
  NotificationPost,
} from "@entities/notification";

import { FollowUnfollowButton } from "@features/follow-unfollow-user";
import { NotificationTypeEnum, TransferTypeEnum } from "@shared/lib";
import * as React from "react";
import { FOLLOW_UNFOLLOW_BUTTON } from "../lib";

export interface INotificationCardProps extends INotification {}

export function NotificationCard(props: INotificationCardProps) {
  const { notificationOwner, notificationType, post } = props;

  return (
    <Notification {...props}>
      {notificationType === NotificationTypeEnum.FOLLOW ? (
        <FollowUnfollowButton
          address={notificationOwner?.walletAddress}
          followButtonContent={FOLLOW_UNFOLLOW_BUTTON}
        />
      ) : (
        <NotificationPost
          actions={post?.actions as IAction[]}
          id={post?.id as number}
          transferType={post?.transferType as TransferTypeEnum}
        />
      )}
    </Notification>
  );
}
