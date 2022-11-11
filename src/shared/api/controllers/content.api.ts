import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from '../base-query'

// Define a service using a base URL and expected endpoints
export const contentApi = createApi({
  reducerPath: 'contentApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['CONTENT'],
  endpoints: (builder) => ({
    getFilteredFeed: builder.query<any, { take: number; skip: number }>({
      providesTags: ['CONTENT'],
      query: ({ take, skip }) => {
        return {
          url: `content/filtered?take=${take}&skip=${skip}`,
          method: 'GET',
          credentials: 'omit',
        }
      },
      transformResponse: (res: any, meta: any) => {
        return res.data.filter((el: any) => {
          console.log(el)

          return el.lensId !== null
        })
      },
    }),
    getUnpublishedContent: builder.query<any, any>({
      providesTags: ['CONTENT'],
      query: (args) => {
        return {
          url: `content/unpublished`,
          method: 'GET',
          credentials: 'omit',
        }
      },
      transformResponse: (res: any) => {
        return res.data
      },
    }),
    getContentMetadata: builder.query<any, { contentId: string }>({
      query: ({ contentId }) => {
        return {
          url: `content/${contentId}/metadata`,
          method: 'GET',
          credentials: 'omit',
        }
      },
    }),
    publishContent: builder.mutation<any, { contentId: string }>({
      invalidatesTags: ['CONTENT'],
      query: ({ contentId }) => {
        return {
          url: `content/${contentId}`,
          method: 'POST',

          credentials: 'omit',
        }
      },
    }),
    mirrorPost: builder.mutation<
      any,
      { lensId: string; newLensId: string; description: string }
    >({
      invalidatesTags: ['CONTENT'],
      query: ({ lensId, newLensId, description }) => {
        return {
          url: `content/${lensId}/repost/${newLensId}`,
          method: 'POST',
          body: {
            description,
          },
          credentials: 'omit',
        }
      },
    }),
    bindWithLensId: builder.mutation<any, { contentId: string; lensId: string }>({
      invalidatesTags: ['CONTENT'],
      query: ({ contentId, lensId }) => {
        return {
          url: `content/${contentId}/${lensId}`,
          method: 'PUT',

          credentials: 'omit',
        }
      },
    }),
    removeContent: builder.mutation<any, { contentId: string }>({
      invalidatesTags: ['CONTENT'],
      query: ({ contentId }) => {
        return {
          url: `content/${contentId}`,
          method: 'DELETE',

          credentials: 'omit',
        }
      },
    }),
  }),
})
