/* eslint-disable boundaries/entry-point */
/* eslint-disable boundaries/element-types */
// import { logout } from '@features/auth/model'
import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import type {
  BaseQueryApi,
  BaseQueryFn,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { Mutex } from 'async-mutex'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  mode: 'cors',

  prepareHeaders: (headers, { getState }) => {
    const aToken = localStorage.getItem('access-token')
    // If we have a token set in state, let's assume that we should be passing it.
    if (aToken !== undefined) {
      headers.set('authorization', `Bearer ${aToken}`)
    }

    return headers
  },
})
const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (
  arguments_: string | FetchArgs | never,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(arguments_, api, extraOptions)
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        // @ts-ignore
        const refreshResult: { data: { accessToken: string; refreshToken: string } } =
          await baseQuery(
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

        if (refreshResult.data) {
          localStorage.setItem('access-token', refreshResult.data.accessToken)
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
