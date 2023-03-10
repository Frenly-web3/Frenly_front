import * as React from "react";
import { INotification } from "../model/notification.entity";
import { NotificationAuthor } from "./notification-author.component";

export interface INotificationProps extends INotification {
  children: React.ReactNode;
}

export function Notification(props: INotificationProps) {
  const { children, ...notificationParams } = props;

  return (
    <div className="flex justify-between items-center pb-1 pr-2 w-full">
      <NotificationAuthor
        {...notificationParams}
      />
      {children}
    </div>
  );
}
