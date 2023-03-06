import { clsx } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IAddress } from "@shared/lib";
import { Paper, ShowMore } from "@shared/ui";

import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetNftsByAddress } from "../model";
import { TokenImage } from "./token-image.component";
import { TokensSkeleton } from "./token-skeleton.component";

export interface ITokensPaperProps {
  title: string;
  maxRows: number;
  className?: string;

  address: IAddress;
}

export function TokensPaper(props: ITokensPaperProps) {
  const { title, maxRows, className, address } = props;

  const { tokens, loadMore, hasMore } = useGetNftsByAddress({ address });

  const [showedMore, setShowedMore] = React.useState(false);
  const matches = useMediaQuery("(max-width: 768px)");
  console.log(tokens);

  return (
    <Paper className={clsx("rounded-[2rem]", className)}>
      <div className="flex justify-between mb-4">
        <h4 className="text-black font-rounded font-bold text-2xl">{title}</h4>
        {tokens?.length > 6 && (
          <ShowMore
            onClick={() => setShowedMore((prev) => !prev)}
            showMore={showedMore}
            disabled={tokens?.length <= 4}
          />
        )}
      </div>

      {showedMore ? (
        <InfiniteScroll
          className="grid md:grid-cols-4 grid-cols-3 gap-2"
          dataLength={tokens?.length ?? 0}
          next={loadMore}
          hasMore={hasMore}
          loader={<TokensSkeleton />}
        >
          {tokens?.map((token, index) => {
            return <TokenImage image={token.imageUrl} key={index} />;
          })}
        </InfiniteScroll>
      ) : (
        <div className="grid md:grid-cols-4 grid-cols-3 gap-2">
          {tokens?.slice(0, maxRows * (matches ? 3 : 4)).map((token, index) => {
            return <TokenImage image={token.imageUrl} key={index} />;
          })}
        </div>
      )}
    </Paper>
  );
}
