import { gql, useQuery } from '@apollo/client'

const GET_USER_INFO = gql`
  query getFollowModule($request: SingleProfileQueryRequest!, $who: ProfileId) {
    profile(request: $request) {
      stats {
        totalFollowers
      }
      isFollowing(who: $who)
    }
  }
`

export const useGetUserLensInfo = ({
  profileId,
  isFollowingId,
}: {
  profileId: string
  isFollowingId: string
}) => {
  return useQuery(GET_USER_INFO, {
    variables: {
      request: {
        profileId,
      },
      who: isFollowingId,
    },
  })
}
