import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { setTokens, setUser } from '@store/auth/auth.slice'
import { access } from 'node:fs'

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
          url: `auth/${args.address}/signature`,
          method: 'POST',
          body: {
            signature: args.signature,
          },
          credentials: 'omit',
        }
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
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
      query: args => {
        return {
          url: 'auth/refresh-toke',
          method: 'POST',
          body: {
            refreshToken: localStorage.getItem('refresh-token'),
          },
          credentials: 'omit',
        }
      },
    }),
    publishContent: builder.mutation<any, { contentId: string }>({
      query: args => {
        console.log(args.contentId)

        return {
          url: `content/${args.contentId}`,
          method: 'POST',

          credentials: 'omit',
        }
      },
    }),
    mirrorPost: builder.mutation<any, { lensId: string; newLensId: string }>({
      query: args => {
        console.log(args.lensId, args.newLensId)

        return {
          url: `content/${args.lensId}/repost/${args.newLensId}`,
          method: 'POST',

          credentials: 'omit',
        }
      },
    }),
    addAddressForTrack: builder.mutation<any, { address: string }>({
      query: args => {
        console.log(args.address)

        return {
          url: `admin/user/${args.address}`,
          method: 'POST',

          credentials: 'omit',
        }
      },
    }),
    bindWithLensId: builder.mutation<any, { contentId: string; lensId: string }>({
      query: args => {
        return {
          url: `content/${args.contentId}/${args.lensId}`,
          method: 'PUT',

          credentials: 'omit',
        }
      },
    }),
    publishAdminPost: builder.mutation<any, { contentId: string }>({
      query: args => {
        return {
          url: `admin/content/${args.contentId}`,
          method: 'PUT',

          credentials: 'omit',
        }
      },
    }),
    bindAdminPost: builder.mutation<any, { contentId: string; lensId: string }>({
      query: args => {
        return {
          url: `admin/bind/${args.contentId}/${args.lensId}`,
          method: 'PUT',

          credentials: 'omit',
        }
      },
    }),
    uploadInfo: builder.mutation<any, { username: string; description: string }>({
      query: args => {
        return {
          url: `user`,
          method: 'PUT',
          body: args,
          credentials: 'omit',
        }
      },
    }),
    uploadImage: builder.mutation<any, { avatar: File }>({
      query: args => {
        const formData = new FormData()
        formData.append('avatar', args.avatar, args.avatar.name)
        // console.log(formData)
        // for (const [name, value] of formData) {
        //   console.log(`${name} = ${value}`) // key1=value1, потом key2=value2
        // }
        console.log(args.avatar)
        return {
          url: `user/avatar`,
          method: 'PUT',
          body: formData,
          credentials: 'omit',
        }
      },
    }),
    removeContent: builder.mutation<any, { contentId: string }>({
      query: args => {
        return {
          url: `content/${args.contentId}`,
          method: 'DELETE',

          credentials: 'omit',
        }
      },
    }),
    getAdminPost: builder.query<any, any>({
      query: args => {
        return {
          url: `admin`,
          method: 'GET',

          credentials: 'omit',
        }
      },
    }),
    getUserInfo: builder.query<any, { address: string }>({
      query: args => {
        return {
          url: `user/${args.address}`,
          method: 'GET',

          credentials: 'omit',
        }
      },
    }),
    getNonce: builder.query<any, string>({
      query: address => {
        return {
          url: `auth/${address}/nonce`,
          method: 'GET',
          credentials: 'omit',
        }
      },
    }),
    hasLanceProfile: builder.query<any, string>({
      query: address => {
        return {
          url: `auth/${address}/lens-profile`,
          method: 'GET',
          credentials: 'omit',
        }
      },
    }),
    getFeed: builder.query<any, { take: number; skip: number }>({
      query: args => {
        return {
          url: `content?take=${args.take}&skip=${args.skip}`,
          method: 'GET',
          credentials: 'omit',
        }
      },
    }),
    getUnpublishedContent: builder.query<any, any>({
      query: args => {
        return {
          url: `content/unpublished`,
          method: 'GET',
          credentials: 'omit',
        }
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useRegistrationMutation,
  useSendOtpMutation,
  useGetNonceQuery,
  useGetUnpublishedContentQuery,
  usePublishContentMutation,
  useHasLanceProfileQuery,
  useGetFeedQuery,
  useBindWithLensIdMutation,
  useRemoveContentMutation,
  useMirrorPostMutation,
  useAddAddressForTrackMutation,
  useGetAdminPostQuery,
  usePublishAdminPostMutation,
  useBindAdminPostMutation,
  useGetUserInfoQuery,
  useUploadInfoMutation,
  useUploadImageMutation,
} = authApi
