import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'
import type {
  BaseQueryApi,
  BaseQueryFn,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { Mutex } from 'async-mutex'

import { logout, refreshToken } from './auth/auth.slice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://jsonplaceholder.typicode.com/',
  mode: 'cors',
  // prepareHeaders: (headers, { getState }) => {
  //   const token = (getState() as RootState).auth?.token
  //   // If we have a token set in state, let's assume that we should be passing it.
  //   if (token) {
  //     headers.set('access-token', `${token}`)
  //     console.log(token)
  //   }
  //   return headers
  // },
})

const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args: string | FetchArgs | never, api: BaseQueryApi, extraOptions: {}) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    console.log(result.error.data)

    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshResult = await baseQuery(
          { url: 'auth/users/refresh-tokens', mode: 'cors' },
          api,
          extraOptions
        )

        if (refreshResult.data) {
          api.dispatch(refreshToken(refreshResult.data as { token: string }))

          // retry the initial query
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(logout())
          window.location.href = '/login'
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}
