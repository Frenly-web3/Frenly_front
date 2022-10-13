import { gql } from '@apollo/client'

export const CREATE_PROFILE = gql`
  mutation ($request: CreateProfileRequest!) {
    createProfile(request: $request) {
      followModule: {
        feeFollowModule: {
               amount: {
                   currency: "0xD40282e050723Ae26Aeb0F77022dB14470f4e011",
                   value: "0.01"
               },
               recipient: "0xEEA0C1f5ab0159dba749Dc0BAee462E5e293daaF"
        }
    }
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
