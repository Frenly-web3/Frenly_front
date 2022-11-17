import { gql } from '@apollo/client'
import { client } from '@shared/api'

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`

export const loginLensMutation = ({
  address,
  signature,
}: {
  address: string
  signature: string
}) => {
  console.log(address, signature)

  return client.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  })
}
