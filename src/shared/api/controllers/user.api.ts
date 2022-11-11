import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from '../base-query'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['USER', 'ADMIN'],
  endpoints: (builder) => ({
    getUserInfo: builder.query<any, { address: string }>({
      providesTags: ['USER', 'ADMIN'],
      query: ({ address }) => {
        return {
          url: `user/${address}`,
          method: 'GET',

          credentials: 'omit',
        }
      },
      transformResponse: (res: any) => {
        return res?.data
      },
    }),
    uploadUserInfo: builder.mutation<any, { username: string; description: string }>({
      invalidatesTags: ['USER', 'ADMIN'],
      query: ({ username, description }) => {
        return {
          url: `user`,
          method: 'PUT',
          body: { username, description },
          credentials: 'omit',
        }
      },
    }),
    uploadUserAvatar: builder.mutation<any, { avatar: File }>({
      invalidatesTags: ['USER', 'ADMIN'],
      query: ({ avatar }) => {
        const formData = new FormData()
        formData.append('avatar', avatar, avatar.name)

        return {
          url: `user/avatar`,
          method: 'PUT',
          body: formData,
          credentials: 'omit',
        }
      },
    }),
  }),
})
