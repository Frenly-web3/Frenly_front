import { createApi } from "@reduxjs/toolkit/dist/query/react";
import type { IAddress, IBaseResponse, UsernameTypeEnum } from "@shared/lib";

import { baseQueryWithReauth } from "../base-query";
import type { IUserDto, IUserSubscriptionsDto } from "../dto/user.dto";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["USER", "ADMIN"],
  endpoints: (builder) => ({
    getUserInfo: builder.query<IUserDto, { address: IAddress }>({
      providesTags: ["USER", "ADMIN"],
      query: ({ address }) => {
        return {
          url: `user/${address}`,
          method: "GET",

          credentials: "omit",
        };
      },
      transformResponse: (res: IBaseResponse<IUserDto>) => {
        return res?.data;
      },
    }),
    IsSubscriber: builder.query<boolean, { address: IAddress }>({
      providesTags: ["USER", "ADMIN"],
      query: ({ address }) => {
        return {
          url: `user/${address}/is-follow`,
          method: "GET",

          credentials: "omit",
        };
      },
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
    getUserSubscriptions: builder.query<
      IUserSubscriptionsDto,
      { address: IAddress }
    >({
      providesTags: ["USER", "ADMIN"],
      query: ({ address }) => {
        return {
          url: `user/${address}/subscriptions`,
          method: "GET",

          credentials: "omit",
        };
      },
      transformResponse: (res: IBaseResponse<IUserSubscriptionsDto>) => {
        return res?.data;
      },
    }),

    getUserFollowers: builder.query<
      IUserSubscriptionsDto,
      { address: IAddress }
    >({
      providesTags: ["USER", "ADMIN"],
      query: ({ address }) => {
        return {
          url: `user/${address}/followers`,
          method: "GET",

          credentials: "omit",
        };
      },
      transformResponse: (res: IBaseResponse<IUserSubscriptionsDto>) => {
        return res?.data;
      },
    }),
    getUserSuggestions: builder.query<IUserSubscriptionsDto, void>({
      providesTags: ["USER", "ADMIN"],
      query: () => {
        return {
          url: `user/suggestions`,
          method: "GET",

          credentials: "omit",
        };
      },
      transformResponse: (res: IBaseResponse<IUserSubscriptionsDto>) => {
        return res?.data;
      },
    }),
    uploadUserInfo: builder.mutation<
      any,
      { username: string; description: string }
    >({
      invalidatesTags: ["USER", "ADMIN"],
      query: ({ username, description }) => {
        return {
          url: `user`,
          method: "PUT",
          body: { username, description },
          credentials: "omit",
        };
      },
    }),
    changeUsernameType: builder.mutation<
      void,
      { usernameType: UsernameTypeEnum }
    >({
      invalidatesTags: ["USER", "ADMIN"],
      query: ({ usernameType }) => {
        return {
          url: `user/ens/change-main-type`,
          method: "PUT",
          body: { ensType: usernameType },
          credentials: "omit",
        };
      },
    }),
    subscribeUser: builder.mutation<any, { address: IAddress }>({
      invalidatesTags: ["USER", "ADMIN"],
      query: ({ address }) => {
        return {
          url: `user/subscribe/${address}`,
          method: "POST",
          credentials: "omit",
        };
      },
    }),
    unSubscribeUser: builder.mutation<any, { address: IAddress }>({
      invalidatesTags: ["USER", "ADMIN"],
      query: ({ address }) => {
        return {
          url: `user/unsubscribe/${address}`,
          method: "DELETE",
          credentials: "omit",
        };
      },
    }),
    uploadUserAvatar: builder.mutation<any, { avatar: File }>({
      invalidatesTags: ["USER", "ADMIN"],
      query: ({ avatar }) => {
        const formData = new FormData();
        formData.append("avatar", avatar, avatar.name);

        return {
          url: `user/avatar`,
          method: "PUT",
          body: formData,
          credentials: "omit",
        };
      },
    }),
  }),
});
