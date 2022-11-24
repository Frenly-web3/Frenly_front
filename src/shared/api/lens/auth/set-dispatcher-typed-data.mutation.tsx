import { gql } from '@apollo/client'

import { client } from '../lens-api'

const CREATE_SET_DISPATCHER_TYPED_DATA = gql`
  mutation createSetDispatcherTypedData($request: SetDispatcherRequest!) {
    createSetDispatcherTypedData(request: $request) {
      expiresAt
      id
      typedData {
        types {
          SetDispatcherWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          dispatcher
        }
      }
    }
  }
`

export const useSetDispatcherTypedData = () => {
  return {
    setDispatcherTypedData: ({ profileId }: { profileId: string }) =>
      client.mutate({
        mutation: CREATE_SET_DISPATCHER_TYPED_DATA,
        variables: {
          request: {
            profileId,
          },
        },
      }),
  }
}
