import { SearchBlock } from "@features/search-user";
import { useChangeAddress } from "@widgets/change-address";
import { Layout } from "@widgets/layout";
import * as React from "react";

export default function SearchPage() {
  useChangeAddress();
  return (
    <Layout title="search">
      <section className="w-full max-md:h-screen h-full pb-4">
        <SearchBlock />
      </section>
    </Layout>
  );
}
