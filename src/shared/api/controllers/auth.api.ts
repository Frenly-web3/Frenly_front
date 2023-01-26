import { createApi } from '@reduxjs/toolkit/dist/query/react'
import type { IAddress, IBaseResponse } from '@shared/lib'

import { baseQueryWithReauth } from '../base-query'
import type { INonceDto, IValidateDto, IValidateDtoRequest } from '../dto/auth.dto'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['USER', 'ADMIN'],
  endpoints: (builder) => ({
    getUserNonce: builder.query<INonceDto, { address: IAddress }>({
      query: ({ address }: { address: IAddress }) => {
        return {
          url: `auth/${address}/nonce`,
          method: 'GET',
          credentials: 'omit',
        }
      },
      transformResponse: (res: IBaseResponse<INonceDto>) => res.data,
    }),
    validateUserSignature: builder.mutation<IValidateDto, IValidateDtoRequest>({
      query: ({ address, signature }: IValidateDtoRequest) => {
        return {
          url: `auth/${address}/signature`,
          method: 'POST',
          body: {
            signature,
          },
          credentials: 'omit',
        }
      },
      transformResponse: (res: IBaseResponse<IValidateDto>) => res.data,
    }),
    refreshTokens: builder.query<any, null>({
      query: () => {
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
