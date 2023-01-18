import { createApi } from '@reduxjs/toolkit/dist/query/react'
import type { IBaseResponse } from '@shared/lib'

import { baseQueryWithReauth } from '../base-query'
import type { ICommunityFeedRequest, IFeedRequest, IPostDto } from '../dto/content.dto'

export const contentApi = createApi({
  reducerPath: 'contentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['CONTENT'],
  endpoints: (builder) => ({
    getFilteredFeed: builder.query<IPostDto[], IFeedRequest>({
      providesTags: ['CONTENT'],
      query: ({ take, skip }) => {
        return {
          url: `content/filtered?take=${take}&skip=${skip}`,
          method: 'GET',
          credentials: 'omit',
        }
      },
      transformResponse: (res: IBaseResponse<IPostDto[]>) => {
        return res.data
      },
    }),
    getCommunityFeed: builder.query<IPostDto[], ICommunityFeedRequest>({
      providesTags: ['CONTENT'],
      query: ({ communityId, take, skip }) => {
        return {
          url: `content/community/${communityId}?take=${take}&skip=${skip}`,
          method: 'GET',
          credentials: 'omit',
        }
      },
      transformResponse: (res: IBaseResponse<IPostDto[]>) => {
        return res.data
      },
    }),
  }),
})
