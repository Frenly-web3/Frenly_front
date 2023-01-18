import { createApi } from '@reduxjs/toolkit/dist/query/react'
import type { IBaseResponse } from '@shared/lib'

import { baseQueryWithReauth } from '../base-query'
import type { ICommunityDto } from '../dto'

export const communityApi = createApi({
  reducerPath: 'communityApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['COMMUNITY'],
  endpoints: (builder) => ({
    getCommunityList: builder.query<ICommunityDto[], any>({
      providesTags: ['COMMUNITY'],
      query: () => {
        return {
          url: `community`,
          method: 'GET',
          credentials: 'omit',
        }
      },
      transformResponse: (res: IBaseResponse<ICommunityDto[]>) => {
        return res.data
      },
    }),
    getCommunityInfo: builder.query<ICommunityDto, any>({
      providesTags: ['COMMUNITY'],
      query: ({ id }: { id: number }) => {
        return {
          url: `community/${id}`,
          method: 'GET',
          credentials: 'omit',
        }
      },
      transformResponse: (res: IBaseResponse<ICommunityDto>) => {
        return res.data
      },
    }),
  }),
})
