import { gql } from '@apollo/client'

import { client } from '../lens-api'

const CREATE_POST_VIA_DISPATCHER = gql`
  mutation CreatePostViaDispatcher($request: CreatePublicPostRequest!) {
    createPostViaDispatcher(request: $request) {
      ... on RelayerResult {
        txHash
        txId
      }
      ... on RelayError {
        reason
      }
    }
  }
`
interface ICreatePostTypedData {
  profileId: string
  contentURI: string
}

export const useCreatePostViaDispatcher = () => ({
  createPostViaDispatcher: ({ profileId, contentURI }: ICreatePostTypedData) =>
    client.mutate({
      mutation: CREATE_POST_VIA_DISPATCHER,
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
