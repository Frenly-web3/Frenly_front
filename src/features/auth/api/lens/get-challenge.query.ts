import { gql } from '@apollo/client'
import { client } from '@shared/api'

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`

export const getChallenge = (address: string) => {
  return client.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  })
}
