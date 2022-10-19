import { gql } from '@apollo/client'

export const SET_FOLLOW_DATA = gql`
  mutation createSetFollowModuleTypedData($request: CreateSetFollowModuleRequest!) {
    createSetFollowModuleTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          SetFollowModuleWithSig {
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
          followModule
          followModuleInitData
        }
      }
    }
  }
`
