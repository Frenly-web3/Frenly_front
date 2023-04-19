import { createApi } from "@reduxjs/toolkit/dist/query/react";
import type { IAddress, IBaseResponse } from "@shared/lib";

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
      { postId: number; take?: number; skip?: number }
    >({
      providesTags: (result, error, arg) =>
        result
          ? [{ type: "REACTIONS" as const, id: arg.postId }, "REACTIONS"]
          : ["REACTIONS"],
      query: ({ postId, take = 2, skip = 0 }) => {
        return {
          url: `content/${postId}/comments?${take ? `take=${take}` : ""}${
            skip ? `&skip=${skip}` : "&skip=0"
          }`,
          method: "GET",
          credentials: "omit",
        };
      },
      transformResponse: (res: IBaseResponse<ICommentsDto>) => {
        return res?.data;
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
      any,
      { postId: number; comment: string; mentions: IAddress[] }
    >({
      invalidatesTags: (result, error, arg) => [
        { type: "REACTIONS", id: arg.postId },
      ],
      query: ({ postId, comment, mentions }) => {
        return {
          url: `content/comment/create`,
          method: "Post",
          credentials: "omit",
          body: {
            postId,
            comment,
            mentions: mentions.length === 0 ? undefined : undefined,
          },
        };
      },
    }),
  }),
});
