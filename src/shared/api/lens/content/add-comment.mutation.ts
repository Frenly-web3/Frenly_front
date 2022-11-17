import { gql } from '@apollo/client'

import { client } from '../lens-api'

const CREATE_COMMENT_TYPED_DATA = gql`
  mutation ($request: CreatePublicCommentRequest!) {
    createCommentTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          CommentWithSig {
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
          profileIdPointed
          pubIdPointed
          referenceModuleData
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
interface ICreateCommentTypedData {
  profileId: string
  publicationId: string
  contentURI: string
}

export const useCreateCommentTypedData = () => ({
  createCommentTypedData: ({
    profileId,
    publicationId,
    contentURI,
  }: ICreateCommentTypedData) =>
    client.mutate({
      mutation: CREATE_COMMENT_TYPED_DATA,
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
