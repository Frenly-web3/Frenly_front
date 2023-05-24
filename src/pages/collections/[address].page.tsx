import { CollectionInfo } from "@entities/collections";
import { TokenImage, TokensSkeleton } from "@entities/tokens";
import { useGetNftsByAddress } from "@entities/tokens/model";
import { IAddress } from "@shared/lib";
import { Layout } from "@widgets/layout";
import { useRouter } from "next/router";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export interface ICollectionsPageProps {}

export default function CollectionsPage(props: ICollectionsPageProps) {
  const { query } = useRouter();

  const { address, user } = query;

  const { tokens, hasMore, loadMore } = useGetNftsByAddress({
    address: user as IAddress,
    contractAddress: address as IAddress,
  });

  console.log(tokens);

  return (
    <Layout title="collection">
      <section className="w-full rounded-t-[2rem] p-4 bg-white h-full">
        <CollectionInfo collectionAddress={address as IAddress} />

        <InfiniteScroll
          className="grid grid-cols-2 p-4 gap-4"
          dataLength={tokens?.length ?? 0}
          next={loadMore}
          hasMore={hasMore}
          loader={<TokensSkeleton />}
        >
          {tokens?.map((token, index) => {
            return <TokenImage {...token} key={index} />;
          })}
        </InfiniteScroll>
      </section>
    </Layout>
  );
}
