import { gql, useQuery } from '@apollo/client'
import { SIZE_POST_CHUNK } from '@shared/lib/constants'

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
      pageInfo {
        totalCount
        prev
        next
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

export const useGetLensPublicationsForUser = ({
  profileId,
  cursor,
  skip,
}: {
  profileId: string
  cursor: string | null
  skip: boolean
}) => {
  return useQuery(GET_PUBLICATIONS, {
    skip,
    variables: {
      request: {
        profileId,
        publicationTypes: ['POST', 'MIRROR'],
        cursor,
        limit: SIZE_POST_CHUNK,
      },
    },
  })
}
