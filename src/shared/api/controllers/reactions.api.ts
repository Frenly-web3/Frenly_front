import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from '../base-query'

export const reactionsApi = createApi({
  reducerPath: 'reactionsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['REACTIONS', 'LIKES'],
  endpoints: (builder) => ({
    isPostLiked: builder.query<any, { postId: number }>({
      providesTags: ['LIKES'],
      query: ({ postId }: { postId: number }) => {
        return {
          url: `content/${postId}/is-liked`,
          method: 'GET',
          credentials: 'omit',
        }
      },
      transformResponse: (res: any) => {
        return res.data as boolean
      },
    }),
    postReactions: builder.query<any, { postId: number }>({
      providesTags: ['REACTIONS'],
      query: ({ postId }) => {
        return {
          url: `content/${postId}/reactions`,
          method: 'GET',
          credentials: 'omit',
        }
      },
      transformResponse: (res: any) => {
        return res.data
      },
    }),
    postLike: builder.mutation<any, { postId: number }>({
      query: ({ postId }) => {
        return {
          url: `content/${postId}/like`,
          method: 'Post',
          credentials: 'omit',
        }
      },
      transformResponse: (res: any) => {
        return res.data
      },
    }),
  }),
})
