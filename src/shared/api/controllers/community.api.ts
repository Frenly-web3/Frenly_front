import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from '../base-query'

export const communityApi = createApi({
  reducerPath: 'communityApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['COMMUNITY'],
  endpoints: (builder) => ({
    getCommunityList: builder.query<ICommunity[], any>({
      providesTags: ['COMMUNITY'],
      query: () => {
        return {
          url: `community`,
          method: 'GET',
          credentials: 'omit',
        }
      },
      transformResponse: (res: IGetCommunityList) => {
        return res.data
      },
    }),
    getCommunity: builder.query<ICommunity, any>({
      providesTags: ['COMMUNITY'],
      query: ({ id }: { id: number }) => {
        return {
          url: `community/${id}`,
          method: 'GET',
          credentials: 'omit',
        }
      },
      transformResponse: (res: IGetCommunity) => {
        return res.data
      },
    }),
  }),
})

interface IGetCommunityList {
  status: number
  data: ICommunity[]
  error: any
}

interface IGetCommunity {
  status: number
  data: ICommunity
  error: any
}

interface ICommunity {
  id: number
  creator: number
  name: string
  contractAddress: `0x${string}`
  membersAmount: number
  description: string
  image: string
}
