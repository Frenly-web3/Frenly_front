import { gql, useQuery } from '@apollo/client'

const GET_IS_REACTIONS = gql`
  query (
    $request: PublicationsQueryRequest!
    $requestReaction: ReactionFieldResolverRequest
  ) {
    publications(request: $request) {
      items {
        __typename
        ... on Post {
          reaction(request: $requestReaction)
        }
        ... on Mirror {
          reaction(request: $requestReaction)
        }
      }
    }
  }
`

export const useGetIsReact = ({
  publicationId,
  viewerProfileLensId,
}: {
  publicationId: string
  viewerProfileLensId: string
}) => {
  return useQuery(GET_IS_REACTIONS, {
    variables: {
      request: {
        publicationIds: [publicationId],
      },
      requestReaction: {
        profileId: viewerProfileLensId,
      },
    },
  })
}
