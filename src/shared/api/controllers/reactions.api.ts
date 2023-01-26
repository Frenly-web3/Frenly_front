import { createApi } from '@reduxjs/toolkit/dist/query/react'
import type { IBaseResponse } from '@shared/lib'

import { baseQueryWithReauth } from '../base-query'
import type { IReactionsDto } from '../dto/reactions.dto'

export const reactionsApi = createApi({
  reducerPath: 'reactionsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['REACTIONS', 'LIKES'],
  endpoints: (builder) => ({
    isPostLiked: builder.query<boolean, { postId: number }>({
      providesTags: ['LIKES'],
      query: ({ postId }: { postId: number }) => {
        return {
          url: `content/${postId}/is-liked`,
          method: 'GET',
          credentials: 'omit',
        }
      },
      transformResponse: (res: IBaseResponse<boolean>) => {
        return res.data
      },
    }),
    postReactions: builder.query<IReactionsDto, { postId: number }>({
      providesTags: ['REACTIONS'],
      query: ({ postId }) => {
        return {
          url: `content/${postId}/reactions`,
          method: 'GET',
          credentials: 'omit',
        }
      },
      transformResponse: (res: IBaseResponse<IReactionsDto>) => {
        return res.data
      },
    }),
    postLikeUnlike: builder.mutation<any, { postId: number }>({
      query: ({ postId }) => {
        return {
          url: `content/${postId}/like`,
          method: 'Post',
          credentials: 'omit',
        }
      },
    }),
    createComment: builder.mutation<any, { postId: number; comment: string }>({
      query: ({ postId, comment }) => {
        return {
          url: `content/comment/create`,
          method: 'Post',
          credentials: 'omit',
          body: {
            postId,
            comment,
          },
        }
      },
    }),
  }),
})
