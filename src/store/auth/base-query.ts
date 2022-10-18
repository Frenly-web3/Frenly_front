import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import type { BaseQueryApi, BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import type { RootState } from '@store/store'
import { Mutex } from 'async-mutex'

import { logout } from './auth.slice'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  mode: 'cors',

  prepareHeaders: (headers, { getState }) => {
    const aToken = localStorage.getItem('access-token')
    const rToken = localStorage.getItem('refresh-token')
    // If we have a token set in state, let's assume that we should be passing it.
    if (aToken !== undefined) {
      headers.set('authorization', `Bearer ${aToken}`)
    }

    // headers.set('refresh-token', `${rToken}`)

    return headers
  },
})

const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (arguments_: string | FetchArgs | never, api: BaseQueryApi, extraOptions: {}) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(arguments_, api, extraOptions)
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          {
            url: 'auth/refresh-token',
            method: 'POST',
            body: {
              refreshToken: localStorage.getItem('refresh-token'),
            },
          },
          api,
          extraOptions
        )
        console.log(refreshResult)

        if (refreshResult.data) {
          // @ts-ignore
          localStorage.setItem('access-token', refreshResult.data.accessToken)
          // @ts-ignore
          localStorage.setItem('refresh-token', refreshResult.data.refreshToken)
          // retry the initial query
          result = await baseQuery(arguments_, api, extraOptions)
        } else {
          localStorage.clear()
          window.location.pathname = '/auth'
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(arguments_, api, extraOptions)
    }
  }

  return result
}
