/* eslint-disable import/no-cycle */
import { gql } from '@apollo/client'

import { client } from '../lens-api'

const REFRESH = `mutation ($request: RefreshRequest!) {
   refresh(request: $request) {
     accessToken
     refreshToken
   }
 }`

export const refreshAuthTokenLens = async ({
  refreshToken,
}: {
  refreshToken: string
}) => {
  const result = await client.mutate({
    mutation: gql(REFRESH),
    variables: {
      request: { refreshToken },
    },
  })

  return result.data!.refresh
}
