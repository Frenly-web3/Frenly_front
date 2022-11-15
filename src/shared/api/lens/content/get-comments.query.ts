import { gql, useQuery } from '@apollo/client'

const GET_COMMENTS = gql`
  query getComments($request: PublicationsQueryRequest!) {
    publications(request: $request) {
      items {
        ... on Comment {
          id
          metadata {
            description
            content
          }
          profile {
            id
            ownedBy
          }
          createdAt
        }
      }
    }
  }
`

export const useGetLensComments = ({ publicationId }: { publicationId: string }) => {
  return useQuery(GET_COMMENTS, {
    variables: {
      request: {
        commentsOf: publicationId,
      },
    },
  })
}
