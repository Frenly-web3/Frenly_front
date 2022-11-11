import { gql } from '@apollo/client'
import { client } from '@shared/api'

export const CREATE_PROFILE = `
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

export const createProfile = ({ address }: { address: string }) => {
  return client.mutate({
    mutation: gql(CREATE_PROFILE),
    variables: {
      request: {
        handle: `frenly${address.toLowerCase().slice(0, 10)}`,
        profilePictureUri: null,
        followModule: {
          freeFollowModule: true,
        },
      },
    },
  })
}
