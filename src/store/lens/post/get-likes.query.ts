export const GET_REACTIONS = `
query Publications($publicationsRequest: PublicationsQueryRequest!, $reactionRequest: ReactionFieldResolverRequest)  {
  publications(request: {
    profileId: "0x4685",
    publicationTypes: [POST, COMMENT, MIRROR],
    limit: 10,
  }) {
    items {
      __typename 
      ... on Post {
        reaction(request: { profileId: "0x4685" })
      }
      ... on Comment {
        reaction(request: { profileId: "0x4685" })
      }
      ... on Mirror {
        reaction(request: { profileId: "0x4685" })
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
`
