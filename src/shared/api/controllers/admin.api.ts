import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from '../base-query'

// Define a service using a base URL and expected endpoints
export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['ADMIN'],
  endpoints: (builder) => ({
    getUnpublishedPost: builder.query<any, any>({
      providesTags: ['ADMIN'],
      query: (args) => {
        return {
          url: `admin`,
          method: 'GET',
          credentials: 'omit',
        }
      },
      transformResponse: (res: any) => {
        return res.data
          .filter((el: any) => el.lensId !== null)
          .map((el: any) => el.lensId)
      },
    }),
    getPostMetadata: builder.query<any, { contentId: string }>({
      providesTags: ['ADMIN'],
      query: ({ contentId }) => {
        return {
          url: `admin/content/${contentId}`,
          method: 'GET',
          credentials: 'omit',
        }
      },
    }),
    addUserForTrack: builder.mutation<any, { address: string }>({
      invalidatesTags: ['ADMIN'],
      query: ({ address }) => {
        return {
          url: `admin/user/${address}`,
          method: 'POST',
          credentials: 'omit',
        }
      },
    }),
    publishPost: builder.mutation<any, { contentId: string }>({
      invalidatesTags: ['ADMIN'],
      query: ({ contentId }) => {
        return {
          url: `admin/content/${contentId}`,
          method: 'PUT',

          credentials: 'omit',
        }
      },
    }),
    bindPostWithLens: builder.mutation<any, { contentId: string; lensId: string }>({
      invalidatesTags: ['ADMIN'],
      query: ({ contentId, lensId }) => {
        return {
          url: `admin/bind/${contentId}/${lensId}`,
          method: 'PUT',

          credentials: 'omit',
        }
      },
    }),
    removeContent: builder.mutation<any, { contentId: string }>({
      invalidatesTags: ['ADMIN'],
      query: ({ contentId }) => {
        return {
          url: `admin/content/${contentId}`,
          method: 'DELETE',

          credentials: 'omit',
        }
      },
    }),
  }),
})
