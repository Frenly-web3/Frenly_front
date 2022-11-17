import { gql } from '@apollo/client'

// eslint-disable-next-line import/no-cycle
import { client } from '../lens-api'

const CREATE_FOLLOW_TYPED_DATA = gql`
  mutation ($request: FollowRequest!) {
    createFollowTypedData(request: $request) {
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
          FollowWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          profileIds
          datas
        }
      }
    }
  }
`

interface ICreateFollowTypedData {
  followProfileId: string
}

export const useCreateFollowTypedData = () => ({
  createFollowTypedData: ({ followProfileId }: ICreateFollowTypedData) =>
    client.mutate({
      mutation: CREATE_FOLLOW_TYPED_DATA,
      variables: {
        request: {
          follow: [
            {
              profile: followProfileId,
            },
          ],
        },
      },
    }),
})
