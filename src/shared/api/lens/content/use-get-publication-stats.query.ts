import { gql, useQuery } from '@apollo/client'

const GET_PUBLICATIONS_STATS = gql`
  query getPublicationStats($request: PublicationQueryRequest!) {
    publication(request: $request) {
      ... on Post {
        id
        stats {
          totalUpvotes
          totalAmountOfComments
          totalAmountOfMirrors
        }
      }
      ... on Mirror {
        id
        stats {
          totalUpvotes
          totalAmountOfComments
          totalAmountOfMirrors
        }
      }
    }
  }
`

export const useGetPublicationsStats = ({ publicationId }: { publicationId: string }) => {
  return useQuery(GET_PUBLICATIONS_STATS, {
    variables: {
      request: {
        publicationId,
      },
    },
  })
}
