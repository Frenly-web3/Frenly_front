import { gql, useQuery } from '@apollo/client'

const GET_PUBLICATIONS = gql`
  query getPublicationsInfo($request: PublicationsQueryRequest!) {
    publications(request: $request) {
      items {
        ... on Post {
          id
          profile {
            id
            ownedBy
          }
          metadata {
            attributes {
              value
              displayType
              traitType
            }
          }
        }
        ... on Mirror {
          id
          profile {
            id
            ownedBy
          }
          metadata {
            attributes {
              value
              displayType
              traitType
            }
          }
          mirrorOf {
            ... on Post {
              profile {
                id
                ownedBy
              }
            }
          }
        }
      }
    }
  }
`

export const useGetLensPublications = (dataFeeds: any) => {
  return useQuery(GET_PUBLICATIONS, {
    skip: !dataFeeds,
    variables: {
      request: {
        publicationIds: dataFeeds?.map((el: any) => el.lensId),
      },
    },
  })
}
