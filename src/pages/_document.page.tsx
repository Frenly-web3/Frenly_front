import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

const AppConfig = {
  site_name: "",
  title: "",
  description: "",
  locale: "en",
};
// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={AppConfig.locale} style={{ touchAction: "none" }}>
        <Head>
          <link rel="manifest" href="/manifest.json" />

          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-WT2RN11BQT"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WT2RN11BQT');`}
          </Script>
        </Head>
        <body>
          <Main />
          <div id="portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
