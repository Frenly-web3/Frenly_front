import "@shared/styles/global.scss";
import "react-toastify/dist/ReactToastify.css";

import { ApolloProvider } from "@apollo/client";
import { store } from "@app/store";
import { AuthContextProvider } from "@entities/user";
import { client } from "@shared/api";
import { LoaderContextProvider } from "@shared/lib";
import { Loader } from "@shared/ui";
import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { polygonMumbai, mainnet } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import localFont from "next/font/local";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
const { publicClient, webSocketPublicClient, chains } = configureChains(
  [mainnet, polygonMumbai],
  [publicProvider()]
);

const iconFont = localFont({
  src: "../../public/assets/fonts/Material-Symbols-Rounded.woff2",
  variable: "--font-icon",
  preload: true,
});

const wagmiClient = createConfig({
  publicClient,
  webSocketPublicClient,
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      options: {
        // name: (detectedName) =>
        //   `Injected (${
        //     typeof detectedName === "string"
        //       ? detectedName
        //       : detectedName.join(", ")
        //   })`,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "fa54d1f8f0ab067cf6a6922aef469134",
      },
    }),
  ],
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={`${iconFont.variable}`}>
      <style jsx global>{`
        :root {
          --font-icon: ${iconFont.style.fontFamily};
        }
      `}</style>
      <WagmiConfig config={wagmiClient}>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <AuthContextProvider>
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
            </AuthContextProvider>
          </Provider>
        </ApolloProvider>
      </WagmiConfig>
    </main>
  );
};

export default MyApp;
