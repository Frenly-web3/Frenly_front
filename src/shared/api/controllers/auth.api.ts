import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from '../base-query'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['USER', 'ADMIN'],
  endpoints: (builder) => ({
    getUserNonce: builder.query<any, { address: string }>({
      query: ({ address }) => {
        return {
          url: `auth/${address}/nonce`,
          method: 'GET',
          credentials: 'omit',
        }
      },
    }),
    hasLanceProfile: builder.query<any, { address: string }>({
      query: ({ address }) => {
        return {
          url: `auth/${address}/lens-profile`,
          method: 'GET',
          credentials: 'omit',
        }
      },
    }),
    validateUserSignature: builder.mutation<
      { refreshToken: string; accessToken: string },
      {
        address: string
        signature: string
      }
    >({
      query: ({ address, signature }) => {
        return {
          url: `auth/${address}/signature`,
          method: 'POST',
          body: {
            signature,
          },
          credentials: 'omit',
        }
      },
    }),
    refreshTokens: builder.query<any, any>({
      query: (args) => {
        return {
          url: 'auth/refresh-token',
          method: 'POST',
          body: {
            refreshToken: localStorage.getItem('refresh-token'),
          },
          credentials: 'omit',
        }
      },
    }),
  }),
})
