import '@shared/styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'

import { ApolloProvider } from '@apollo/client'
import { store } from '@app/store'
import { client } from '@shared/api'
import { LoaderContextProvider } from '@shared/lib'
import { Loader } from '@shared/ui'
import type { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { provider, webSocketProvider } = configureChains([mainnet], [publicProvider()])

const wagmiClient = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <LoaderContextProvider>
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
            <Component {...pageProps} />
            <Loader />
          </LoaderContextProvider>
        </Provider>
      </ApolloProvider>
    </WagmiConfig>
  )
}

export default MyApp
