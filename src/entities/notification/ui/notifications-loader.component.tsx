import * as React from "react";
import { NOTIFICATIONS_LOADER } from "../lib";
import { NotificationSkeleton } from "./notification-skeleton.component";

export interface INotificationsLoaderProps {}

export function NotificationsLoader(props: INotificationsLoaderProps) {
  return (
    <div className="flex flex-col gap-y-5">
      {NOTIFICATIONS_LOADER.map((notificationsState, index) => {
        return (
          <NotificationSkeleton isFollow={notificationsState} key={index} />
        );
      })}
    </div>
  );
}
