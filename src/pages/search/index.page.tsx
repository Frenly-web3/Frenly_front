import { SearchBlock } from "@features/search-user";
import { useChangeAddress } from "@widgets/change-address";
import { Layout } from "@widgets/layout";
import * as React from "react";

export default function SearchPage() {
  useChangeAddress();
  return (
    <Layout title="search">
      <section className="lg:max-w-[37rem] md:min-w-[18rem] md:px-4 lg:mr-60 max-md:min-h-screen">
        <SearchBlock />
      </section>
    </Layout>
  );
}
