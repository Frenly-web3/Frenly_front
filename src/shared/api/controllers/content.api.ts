import { createApi } from "@reduxjs/toolkit/dist/query/react";
import type { IBaseResponse } from "@shared/lib";

import { baseQueryWithReauth } from "../base-query";
import type {
  ICommunityFeedRequest,
  IFeedRequest,
  IPostDto,
  IWalletAddressFeedDto,
  IWalletAddressFeedRequest,
} from "../dto/content.dto";

export const contentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["CONTENT"],
  endpoints: (builder) => ({
    getFilteredFeed: builder.query<IWalletAddressFeedDto, IFeedRequest>({
      providesTags: ["CONTENT"],
      query: ({ take, skip }) => {
        return {
          url: `content/filtered?take=${take}&skip=${skip}`,
          method: "GET",
          credentials: "omit",
        };
      },
      transformResponse: (res: IBaseResponse<IWalletAddressFeedDto>) => {
        return res.data;
      },
    }),

    getPostById: builder.query<IPostDto, {id: string}>({
      providesTags: ["CONTENT"],
      query: ({ id }) => {
        return {
          url: `content/${id}`,
          method: "GET",
          credentials: "omit",
        };
      },
      transformResponse: (res: IBaseResponse<IPostDto>) => {
        return res.data;
      },
    }),

    getCommunityFeed: builder.query<
      IWalletAddressFeedDto,
      ICommunityFeedRequest
    >({
      providesTags: ["CONTENT"],
      query: ({ take, skip, communityId }) => {
        return {
          url: `content/community/${communityId}?take=${take}&skip=${skip}`,
          method: "GET",
          credentials: "omit",
        };
      },
      transformResponse: (res: IBaseResponse<IWalletAddressFeedDto>) => {
        return res.data;
      },
    }),

    getWalletAddressFeed: builder.query<
      IWalletAddressFeedDto,
      IWalletAddressFeedRequest
    >({
      providesTags: ["CONTENT"],
      query: ({ take, skip, address }) => {
        return {
          url: `/content/user/${address}/?take=${take}&skip=${skip}`,
          method: "GET",
          credentials: "omit",
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs: { address, take } }) => {
        return { endpointName, address, take };
      },
      merge: (currentCache, newItems, { arg: { skip, address } }) => {
        if (skip == 0) {
          currentCache = newItems;
        } else {
          currentCache.posts.push(...newItems.posts);
          currentCache.totalPosts = newItems.totalPosts;
        }
        return currentCache;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },

      transformResponse: (res: IBaseResponse<IWalletAddressFeedDto>) => {
        return res.data;
      },
    }),
  }),
});
