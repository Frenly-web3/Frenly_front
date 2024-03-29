import type { RoleEnum } from "@shared/lib";
import Head from "next/head";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

type IMetaProperties = {
  title: RoleEnum | string;
  description: string;
  canonical?: string;
};

const Meta = (props: IMetaProperties) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta charSet="utf8" key="charset" />

        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width-1, target-densitydpi=device-dpi"
        />

        <link
          rel="apple-touch-icon"
          href={`${router.basePath}/assets/favicon/apple-touch-icon.png`}
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${router.basePath}/assets/favicon/favicon-32x32.png`}
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${router.basePath}/assets/favicon/favicon-16x16.png`}
          key="icon16"
        />
        <link
          rel="icon"
          href={`${router.basePath}/assets/favicon/favicon.ico`}
          key="favicon"
        />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.canonical}
        openGraph={{
          title: props.title,
          description: props.description,
          url: props.canonical,
          locale: "en",
          site_name: "",
        }}
      />
    </>
  );
};

export { Meta };
