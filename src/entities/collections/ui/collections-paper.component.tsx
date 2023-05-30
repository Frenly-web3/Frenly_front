import { clsx } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IAddress } from "@shared/lib";
import { Paper, ShowMore } from "@shared/ui";

import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetCollectionsByAddress } from "../model";
import { CollectionCard } from "./collection-card.component";
import { TokensSkeleton } from "@entities/tokens/ui/token-skeleton.component";

export interface ITokensPaperProps {
  title: string;
  maxRows: number;
  className?: string;

  address: IAddress;
}

export function CollectionsPaper(props: ITokensPaperProps) {
  const { title, maxRows, className, address } = props;

  const { collections, loadMore, hasMore } = useGetCollectionsByAddress({
    address,
  });

  const [showedMore, setShowedMore] = React.useState(false);
  const matches = useMediaQuery("(max-width: 768px)");

  return (
    <Paper className={clsx("rounded-[2rem]", className)}>
      <div className="flex justify-between mb-4">
        <h4 className="text-black font-rounded font-bold text-2xl">{title}</h4>
        {collections?.length > 6 && (
          <ShowMore
            onClick={() => setShowedMore((prev) => !prev)}
            showMore={showedMore}
            disabled={collections?.length <= 4}
          />
        )}
      </div>

      {showedMore ? (
        <InfiniteScroll
          className="grid md:grid-cols-3 grid-cols-1 gap-2"
          dataLength={collections?.length ?? 0}
          next={loadMore}
          hasMore={hasMore}
          loader={<TokensSkeleton />}
        >
          {collections?.map((collection, index) => {
            return (
              <CollectionCard
                userAddress={address}
                {...collection}
                key={index}
              />
            );
          })}
        </InfiniteScroll>
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
          {collections
            ?.slice(0, maxRows * (matches ? 3 : 4))
            .map((collection, index) => {
              return (
                <CollectionCard
                  userAddress={address}
                  {...collection}
                  key={index}
                />
              );
            })}
        </div>
      )}
    </Paper>
  );
}
