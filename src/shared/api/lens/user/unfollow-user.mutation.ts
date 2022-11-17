import { gql } from '@apollo/client'

// eslint-disable-next-line import/no-cycle
import { client } from '../lens-api'

export const CREATE_UNFOLLOW_TYPED_DATA = gql`
  mutation ($request: UnfollowRequest!) {
    createUnfollowTypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          BurnWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          tokenId
        }
      }
    }
  }
`
interface ICreateUnfollowTypedData {
  followProfileId: string
}

export const useCreateUnfollowTypedData = () => ({
  createUnfollowTypedData: ({ followProfileId }: ICreateUnfollowTypedData) =>
    client.mutate({
      mutation: CREATE_UNFOLLOW_TYPED_DATA,
      variables: {
        request: {
          profile: followProfileId,
        },
      },
    }),
})
