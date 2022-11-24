import { gql } from '@apollo/client'

import { client } from '../lens-api'

const MIRROR_POST_VIA_DISPATCHER = gql`
  mutation CreateMirrorViaDispatcher($request: CreateMirrorRequest!) {
    createMirrorViaDispatcher(request: $request) {
      ... on RelayError {
        reason
      }
      ... on RelayerResult {
        txId
        txHash
      }
    }
  }
`

interface IMirrorPostViaDispatcher {
  profileId: string
  publicationId: string
}

export const useMirrorPostViaDispatcher = () => ({
  mirrorPostViaDispatcher: ({ profileId, publicationId }: IMirrorPostViaDispatcher) =>
    client.mutate({
      mutation: MIRROR_POST_VIA_DISPATCHER,
      variables: {
        request: {
          profileId,
          publicationId,
          referenceModule: null,
        },
      },
    }),
})
