import '@shared/styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'

import { ApolloProvider } from '@apollo/client'
import { store } from '@app/store'
import { DispatcherEnable } from '@features/dispatcher-enable'
import { client } from '@shared/api'
import { DispatcherLensContextProvider, LoaderContextProvider } from '@shared/lib'
import { Loader } from '@shared/ui'
import type { Config } from '@usedapp/core'
import { ChainId, DAppProvider } from '@usedapp/core'
import type { AppProps } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { configureChains, createClient, mainnet, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const config: Config = {
  // readOnlyChainId: ChainId.Mumbai | ChainId.Mainnet,
  readOnlyChainId: ChainId.Mainnet,
  readOnlyUrls: {
    // [ChainId.Mumbai]:
    //   'https://polygon-mumbai.g.alchemy.com/v2/HCm-qNqCQm-NnbV9nHWxq9OnMHkUNvsg',
    [ChainId.Mainnet]:
      'https://eth-mainnet.g.alchemy.com/v2/JANw7_5C171cj-buFVibsh1jIZAwe4Yq',
  },
  notifications: {
    expirationPeriod: 10_000,
    checkInterval: 200_000,
  },
  autoConnect: true,
  noMetamaskDeactivate: true,
}

const { provider, webSocketProvider } = configureChains([mainnet], [publicProvider()])

const wagmiClient = createClient({
  provider,
  webSocketProvider,
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <ApolloProvider client={client}>
        <DAppProvider config={config}>
          <Provider store={store}>
            <DispatcherLensContextProvider>
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
                <DispatcherEnable />
                <Loader />
              </LoaderContextProvider>
            </DispatcherLensContextProvider>
          </Provider>
        </DAppProvider>
      </ApolloProvider>
    </WagmiConfig>
  )
}

export default MyApp
