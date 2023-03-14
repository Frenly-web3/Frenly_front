import { createApi } from "@reduxjs/toolkit/dist/query/react";
import type { IBaseResponse } from "@shared/lib";

import { baseQueryWithReauth } from "../base-query";
import {
  IGetNotificationsDto,
  IGetNotificationsRequest,
  IGetNotificationsTransformedDto,
} from "../dto/notifications.dto";

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["NOTIFICATIONS", "NOTIFICATIONS_COUNT"],
  endpoints: (builder) => ({
    getNotifications: builder.query<
      IGetNotificationsTransformedDto,
      IGetNotificationsRequest
    >({
      providesTags: ["NOTIFICATIONS"],
      query: ({ take, skip }) => {
        return {
          url: `/notification?take=${take}&skip=${skip}`,
          method: "GET",
          credentials: "omit",
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs: { skip } }) => {
        return { endpointName };
      },
      merge: (currentCache, newItems, { arg: { skip } }) => {
        if (skip === 0) {
          return newItems;
        }

        currentCache.notifications.push(...newItems.notifications);
        currentCache.hasMore = newItems.hasMore;
        return currentCache;
      },

      forceRefetch({ currentArg, previousArg }) {
        if (currentArg?.skip === 0) {
          return false;
        }
        return currentArg !== previousArg;
      },

      transformResponse: (res: IBaseResponse<IGetNotificationsDto>) => ({
        notifications: res.data.notifications,
        hasMore:
          res.data.totalNotifications - res.data.notifications.length > 0 &&
          res.data.notifications.length !== 0,
      }),
    }),
    getUnreadCount: builder.query<number, void>({
      providesTags: ["NOTIFICATIONS_COUNT"],
      query: () => {
        return {
          url: `/notification/unread-count`,
          method: "GET",
          credentials: "omit",
        };
      },
      transformResponse: (res: IBaseResponse<number>) => {
        return res.data;
      },
    }),

    readNotifications: builder.mutation<void, void>({
      query: () => {
        return {
          url: `/notification/read`,
          method: "POST",
          credentials: "omit",
        };
      },
      invalidatesTags: ["NOTIFICATIONS_COUNT"],
    }),
  }),
});
