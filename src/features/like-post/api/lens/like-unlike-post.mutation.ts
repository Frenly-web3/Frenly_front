import { gql } from '@apollo/client'
import { client } from '@shared/api'

const LIKE_POST = `
  mutation ($request: ReactionRequest!) {
    addReaction(request: $request)
  }
`
const CANCEL_LIKE_POST = `
  mutation ($request: ReactionRequest!) {
    removeReaction(request: $request)
  }
`

export const likePostLens = ({
  viewerProfileLensId,
  publicationId,
}: {
  viewerProfileLensId: string
  publicationId: string
}) => {
  return client.mutate({
    mutation: gql(LIKE_POST),
    variables: {
      request: {
        profileId: viewerProfileLensId,
        reaction: 'UPVOTE',
        publicationId,
      },
    },
  })
}

export const unlikePostLens = ({
  viewerProfileLensId,
  publicationId,
}: {
  viewerProfileLensId: string
  publicationId: string
}) => {
  return client.mutate({
    mutation: gql(CANCEL_LIKE_POST),
    variables: {
      request: {
        profileId: viewerProfileLensId,
        reaction: 'UPVOTE',
        publicationId,
      },
    },
  })
}
