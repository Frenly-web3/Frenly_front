import { useCallback, useMemo, useState } from "react";
import { INotification, NOTIFICATION_TAKE } from "@entities/notification";
import { notificationsApi } from "@shared/api";
import { IPost } from "@entities/post";

export interface IuseGetNotificationsResp {
  notifications: INotification[];
  isLoading: boolean;
  isError: boolean;
  loadMore: () => void;
  hasMore: boolean;
}

export const useGetNotifications = (): IuseGetNotificationsResp => {
  const [skip, setSkip] = useState(0);
  const {
    data: notificationsData,
    isLoading,
    isError,
  } = notificationsApi.useGetNotificationsQuery({
    skip: skip * NOTIFICATION_TAKE,
    take: NOTIFICATION_TAKE,
  });

  const loadMore = useCallback(() => {
    setSkip((prev) => prev + 1);
  }, []);

  return useMemo(() => {
    return {
      notifications: notificationsData?.notifications?.map(
        ({ actionData, actionDate, actionType }) => {
          return {
            address: actionData?.walletAddress,
            notificationDate: actionDate,
            notificationType: actionType,
            comment: actionData?.comment,
            post: actionData?.post as unknown as IPost | undefined,
          };
        }
      ) as INotification[],
      isError,
      isLoading,
      loadMore,
      hasMore: notificationsData?.hasMore as boolean,
    };
  }, [notificationsData]);
};
