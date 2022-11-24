import { gql } from '@apollo/client'

import { client } from '../lens-api'

const CREATE_COMMENT_VIA_DISPATCHER = gql`
  mutation CreateCommentViaDispatcher($request: CreatePublicCommentRequest!) {
    createCommentViaDispatcher(request: $request) {
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
interface ICreateCommentViaDispatcher {
  profileId: string
  publicationId: string
  contentURI: string
}

export const useCreateCommentViaDispatcher = () => ({
  createCommentViaDispatcher: ({
    profileId,
    publicationId,
    contentURI,
  }: ICreateCommentViaDispatcher) =>
    client.mutate({
      mutation: CREATE_COMMENT_VIA_DISPATCHER,
      variables: {
        request: {
          profileId,
          publicationId,
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
