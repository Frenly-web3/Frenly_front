import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

// eslint-disable-next-line import/no-cycle
import { refreshAuthTokenLens } from './user'

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_LENS_URL })

// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  // if your using node etc you have to handle your auth different
  let token
  if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('access-token-lens')
  }
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      'x-access-token': token ? `Bearer ${token}` : '',
    },
  })

  // Call the next link in the middleware chain.

  return forward(operation)
})

const errorLink = onError(({ forward, operation, graphQLErrors }) => {
  graphQLErrors?.forEach(async (error) => {
    if (error.extensions.code == 'UNAUTHENTICATED') {
      try {
        const token = localStorage.getItem('refresh-token-lens')
        const refreshTokens = await refreshAuthTokenLens({
          refreshToken: token as string,
        })
        localStorage.setItem('access-token-lens', refreshTokens.accessToken)
        localStorage.setItem('refresh-token-lens', refreshTokens.refreshToken)
      } catch {
        window.location.pathname = '/auth'
      }
    }
  })
  return forward(operation)
})

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_LENS_URL,
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
})
