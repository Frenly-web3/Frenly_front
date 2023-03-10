import {
  NotificationsLoader,
  useGetNotifications,
} from "@entities/notification";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NotificationCard } from "./notification-card.component";

export interface INotificationCardListProps {}

export function NotificationCardList(props: INotificationCardListProps) {
  const { notifications, loadMore, hasMore, isLoading } = useGetNotifications();

  return (
    <>
      {isLoading ? <NotificationsLoader /> : <></>}
      <InfiniteScroll
        className="flex gap-y-5 flex-col"
        dataLength={notifications?.length ?? 0}
        next={loadMore}
        hasMore={hasMore}
        loader={<NotificationsLoader />}
      >
        {notifications?.map((notification, index) => {
          return <NotificationCard key={index} {...notification} />;
        })}
      </InfiniteScroll>
    </>
  );
}
