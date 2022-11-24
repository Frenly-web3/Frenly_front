import { gql } from '@apollo/client'

import { client } from '../lens-api'

const IS_HAVE_DISPATCHER = gql`
  query isHaveDispatcher($request: SingleProfileQueryRequest!) {
    profile(request: $request) {
      id
      dispatcher {
        canUseRelay
      }
    }
  }
`

export const useIsHaveDispatcher = () => {
  return {
    isHaveDispatcher: ({ profileId }: { profileId: string }) =>
      client.query({
        query: IS_HAVE_DISPATCHER,
        variables: {
          request: {
            profileId,
          },
        },
      }),
  }
}
