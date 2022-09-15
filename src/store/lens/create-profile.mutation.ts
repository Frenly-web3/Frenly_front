import { gql } from '@apollo/client'

export const CREATE_PROFILE = gql`
  mutation {
    createProfile(request: {
      handle: "unistoryhackoo"
    }) {
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
