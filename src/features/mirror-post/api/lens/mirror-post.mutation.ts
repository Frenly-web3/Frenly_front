import { gql } from '@apollo/client'
import { client } from '@shared/api'

const MIRROR_POST = gql`
  mutation ($request: CreateMirrorRequest!) {
    createMirrorTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          MirrorWithSig {
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
          referenceModule
          referenceModuleData
          referenceModuleInitData
        }
      }
    }
  }
`

export const mirrorPostMutation = ({
  viewerProfileLensId,
  publicationId,
}: {
  viewerProfileLensId: string
  publicationId: string
}) => {
  return client.mutate({
    mutation: MIRROR_POST,
    variables: {
      request: {
        profileId: viewerProfileLensId,
        publicationId,
        referenceModule: null,
      },
    },
  })
}
