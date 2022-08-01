import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '../base-query'
import type { IPhoto } from './models/photo.model'
import type { IPhotosResponse } from './models/photos-response.model'

// Define a service using a base URL and expected endpoints
export const photosApi = createApi({
  reducerPath: 'photosApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['PHOTOS'],
  endpoints: (builder) => ({
    getPhotos: builder.query<IPhotosResponse, void>({
      query: () => {
        return {
          url: 'photos',
          method: 'GET',
        }
      },
      providesTags: ['PHOTOS'],
      transformResponse: (res: IPhotosResponse) => {
        return res
      },
    }),
    getPhoto: builder.query<IPhoto, { id: string }>({
      query: (args: { id: string }) => {
        return {
          url: `photos/${args.id}`,
          method: 'GET',
        }
      },
      transformResponse: (res: IPhoto) => {
        return res
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPhotoQuery, useGetPhotosQuery } = photosApi
