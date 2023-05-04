import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { IAddress, IBaseResponse, QueryOrderDirectionEnum } from "@shared/lib";

import { baseQueryWithReauth } from "../base-query";
import type { ICommentsDto, IReactionsDto } from "../dto/reactions.dto";

export const reactionsApi = createApi({
  reducerPath: "reactionsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["REACTIONS", "LIKES"],
  endpoints: (builder) => ({
    isPostLiked: builder.query<boolean, { postId: number }>({
      providesTags: ["LIKES"],
      query: ({ postId }: { postId: number }) => {
        return {
          url: `content/${postId}/is-liked`,
          method: "GET",
          credentials: "omit",
        };
      },
      transformResponse: (res: IBaseResponse<boolean>) => {
        return res.data;
      },
    }),
    postReactions: builder.query<IReactionsDto, { postId: number }>({
      providesTags: ["REACTIONS"],
      query: ({ postId }) => {
        return {
          url: `content/${postId}/reactions`,
          method: "GET",
          credentials: "omit",
        };
      },
      transformResponse: (res: IBaseResponse<IReactionsDto>) => {
        return res.data;
      },
    }),
    getCommentsById: builder.query<
      ICommentsDto,
      {
        postId: number;
        take?: number;
        skip?: number;
        orderDirection: QueryOrderDirectionEnum;
      }
    >({
      providesTags: (result, error, { postId, orderDirection }) => [
        { type: "REACTIONS" as const, id: postId, orderDirection },
      ],
      query: ({ postId, take, skip, orderDirection }) => {
        return {
          url: `content/${postId}/comments`,
          method: "GET",
          credentials: "omit",
          params: {
            take,
            skip,
            orderDirection,
          },
        };
      },
      serializeQueryArgs: ({
        endpointName,
        queryArgs: { postId, orderDirection },
      }) => {
        return { endpointName, postId, orderDirection };
      },
      merge: (currentCache, newItems, { arg: { skip } }) => {
        if (skip === 0) {
          return newItems;
        }

        currentCache.comments.push(...newItems.comments);
        currentCache.commentsRemaining = newItems.commentsRemaining;
        currentCache.hasMore = newItems.hasMore;
        return currentCache;
      },

      forceRefetch({ currentArg, previousArg }) {
        if (currentArg?.skip === 0) {
          return false;
        }
        return currentArg !== previousArg;
      },
      transformResponse: (res: IBaseResponse<ICommentsDto>) => {
        return {
          comments: res?.data.comments,
          commentsRemaining: res.data.commentsRemaining,
          hasMore: res.data.commentsRemaining !== 0,
        };
      },
    }),
    postLikeUnlike: builder.mutation<any, { postId: number }>({
      query: ({ postId }) => {
        return {
          url: `content/${postId}/like`,
          method: "Post",
          credentials: "omit",
        };
      },
    }),
    createComment: builder.mutation<
      void,
      { postId: number; comment: string; mentions: IAddress[] }
    >({
      invalidatesTags: (result, error, arg) => [
        {
          type: "REACTIONS",
          id: arg.postId,
          orderDirection: QueryOrderDirectionEnum.ASC,
        },
        {
          type: "REACTIONS",
          id: arg.postId,
          orderDirection: QueryOrderDirectionEnum.DESC,
        },
      ],
      query: ({ postId, comment, mentions }) => {
        return {
          url: `content/comment/create`,
          method: "Post",
          credentials: "omit",
          body: {
            postId,
            comment,
            mentions: mentions.length === 0 ? undefined : mentions,
          },
        };
      },
    }),
  }),
});
