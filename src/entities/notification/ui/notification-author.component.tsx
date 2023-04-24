import { clsx } from "@mantine/core";

import { Avatar, Name, TimeDate } from "@shared/ui";
import Link from "next/link";
import * as React from "react";
import { useNotificationTypeInfo } from "../lib";
import { INotification } from "../model/notification.entity";
import { IndicatorNotification } from "./indicator-notification.component";
import { NotificationTypeEnum } from "@shared/lib";

export interface INotificationAuthorProps extends INotification {}

export function NotificationAuthor(props: INotificationAuthorProps) {
  const { address, notificationDate, notificationType, comment, post } = props;

  const { color, content, icon } = useNotificationTypeInfo({
    notificationType,
  });

  return (
    <div className="flex items-start gap-3">
      <Link href={`/profile/${address}`} className="relative">
        <Avatar address={address} className="w-10 aspect-square" />

        <IndicatorNotification
          color={color}
          icon={icon}
          className="absolute w-3 aspect-square px-2 -bottom-1 -right-1"
        />
      </Link>
      <div className="flex flex-col gap-y-1">
        <Link
          href={
            notificationType === NotificationTypeEnum.FOLLOW
              ? `/profile/${address}`
              : `/post/${post?.id}`
          }
          passHref={notificationType === NotificationTypeEnum.FOLLOW}
          className="flex items-start gap-1 mb-[-0.25rem] "
        >
          <Name
            className={clsx(
              `font-rounded text-lg cursor-pointer font-semibold`
            )}
            address={address}
            content={`${content}
            ${
              comment
                ? ` "${comment.slice(0, 10)}${
                    comment.length > 10 ? "..." : ""
                  }"`
                : ""
            }`}
          />
        </Link>

        <div className="font-text text-hidden font-regular text-sm">
          <TimeDate date={notificationDate} />
        </div>
      </div>
    </div>
  );
}
