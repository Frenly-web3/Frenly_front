import { client } from './../../../pages/_app.page';

import { gql } from '@apollo/client'

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }
`

export const generateChallenge = (address:string) => {
   return client.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
         address,
      },
    },
  })
}