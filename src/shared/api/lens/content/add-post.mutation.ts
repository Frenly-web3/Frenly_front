import { gql } from '@apollo/client'

import { client } from '../lens-api'

const CREATE_POST_TYPED_DATA = gql`
  mutation ($request: CreatePublicPostRequest!) {
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
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
          contentURI
          collectModule
          collectModuleInitData
          referenceModule
          referenceModuleInitData
        }
      }
    }
  }
`

interface ICreatePostTypedData {
  profileId: string
  contentURI: string
}

export const useCreatePostTypedData = () => ({
  createPostTypedData: ({ profileId, contentURI }: ICreatePostTypedData) =>
    client.mutate({
      mutation: CREATE_POST_TYPED_DATA,
      variables: {
        request: {
          profileId,
          contentURI,
          collectModule: {
            revertCollectModule: true,
          },
          referenceModule: {
            followerOnlyReferenceModule: false,
          },
        },
      },
    }),
})
