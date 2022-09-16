import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { setTokens, setUser } from '@store/auth/auth.slice'

import { baseQueryWithReauth } from './base-query'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    sendOtp: builder.mutation({
      query: (body: { phoneNumber: string }) => {
        return {
          url: 'auth/users/send-otp/',
          method: 'POST',
          body,
        }
      },
    }),
    registration: builder.mutation({
      query: (body: { phoneNumber: string }) => {
        return {
          url: 'auth/users/',
          method: 'POST',
          body,
          credentials: 'include',
        }
      },

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          console.log(data)

          dispatch(
            setTokens({
              data: {
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken,
              },
            })
          )
        } catch {}
      },
    }),
    login: builder.mutation<
      { refreshToken: string; accessToken: string },
      {
        address: string
        signature: string
      }
    >({
      query: args => {
        return {
          url: `/api/auth/${args.address}/signature`,
          method: 'POST',
          body: {
            signature: args.signature,
          },
          credentials: 'omit',
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          dispatch(setUser({ token: data.accessToken }))
          // dispatch(
          //   // setTokens({
          //   //   data: {
          //   //     accessToken: data.data.accessToken,
          //   //     refreshToken: data.data.refreshToken,
          //   //   },
          //   // })
          // )
        } catch {}
      },
    }),
    refreshTokens: builder.query({
      query: credentials => {
        return {
          url: 'auth/users/refresh-tokens/',
          method: 'GET',
          body: { ...credentials },
          credentials: 'include',
        }
      },
    }),
    getNonce: builder.query<any, string>({
      query: address => {
        return {
          url: `api/auth/${address}/nonce`,
          method: 'GET',
          credentials: 'omit',
        }
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegistrationMutation, useSendOtpMutation, useGetNonceQuery } =
  authApi
