import '../styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'

import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { LoaderContextProvider } from '@components/shared/contexts/loader-context'
import { store } from '@store/store'
import type { Config } from '@usedapp/core'
import { ChainId, DAppProvider } from '@usedapp/core'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const config: Config = {
  readOnlyChainId: ChainId.BSCTestnet,
  readOnlyUrls: {
    // [ChainId.Rinkeby]: infuraProvider,
    // [ChainId.BSC]: "https://bsc-dataseed.binance.org/",
    // [ChainId.BSCTestnet]: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    [ChainId.Mumbai]: 'https://polygon-mumbai.g.alchemy.com/v2/HCm-qNqCQm-NnbV9nHWxq9OnMHkUNvsg',
  },
  notifications: {
    expirationPeriod: 1000,
    checkInterval: 200_000,
  },
  autoConnect: true,
}

const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_LENS_URL })

// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  // if your using node etc you have to handle your auth different
  let token
  if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('auth_token')
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

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_LENS_URL,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <DAppProvider config={config}>
        <Provider store={store}>
          <LoaderContextProvider>
            <Component {...pageProps} />
            <ToastContainer
              position="bottom-left"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </LoaderContextProvider>
        </Provider>
      </DAppProvider>
    </ApolloProvider>
  )
}

export default MyApp
