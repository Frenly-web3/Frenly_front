import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from '../base-query'
import type { ICreateSellOrderDTO } from '../dto/content.dto'

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
        return res.data
          .filter((el: any) => {
            return el.lensId !== null
          })
          .filter((el: any) => {
            return el.lensId !== '0xNaN-0xNaN'
          })
      },
    }),
    getUnpublishedContent: builder.query<any, any>({
      providesTags: ['CONTENT'],
      query: ({ take, skip }: { take: number; skip: number }) => {
        return {
          url: `content/unpublished/?take=${take}&skip=${skip}`,
          method: 'GET',
          credentials: 'omit',
        }
      },
      transformResponse: (res: any) => {
        return res?.data
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
      transformResponse: (res: any) => {
        return res?.data
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
    getCommentMetadata: builder.query<any, { lensId: string; comment: string }>({
      query: ({ lensId, comment }) => {
        return {
          url: `content/comment/metadata`,
          method: 'POST',
          body: { lensId, comment },
          credentials: 'omit',
        }
      },
      transformResponse: (res: any) => {
        return res?.data
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
    createSellOrder: builder.mutation<any, ICreateSellOrderDTO>({
      invalidatesTags: ['CONTENT'],
      query: ({ collectionName, image, price, signedObject, walletAddress }) => {
        return {
          url: `zeroex/sell`,
          method: 'POST',
          body: {
            walletAddress,
            price: Number(price),
            collectionName,
            signedObject,
            image,
          },
          credentials: 'omit',
        }
      },
    }),
    acceptOrder: builder.mutation<any, { id: number }>({
      invalidatesTags: ['CONTENT'],
      query: ({ id }) => {
        return {
          url: `zeroex/accept/${id}`,
          method: 'POST',
          credentials: 'omit',
        }
      },
    }),
    declineOrder: builder.mutation<any, { id: number }>({
      invalidatesTags: ['CONTENT'],
      query: ({ id }) => {
        return {
          url: `zeroex/decline/${id}`,
          method: 'DELETE',
          credentials: 'omit',
        }
      },
    }),
  }),
})
