import { gql } from '@apollo/client'

import { client } from '../lens-api'

const CREATE_PROFILE_LENS = gql`
  mutation ($request: CreateProfileRequest!) {
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
      __typename
    }
  }
`

export const useCreateProfileLens = () => {
  return {
    createProfileLens: ({ account }: { account: string }) =>
      client.mutate({
        mutation: CREATE_PROFILE_LENS,
        variables: {
          request: {
            handle: `frenly_${account.toLowerCase().slice(2, 10)}_eth`,
            profilePictureUri: null,
            followModule: {
              freeFollowModule: true,
            },
          },
        },
      }),
  }
}
