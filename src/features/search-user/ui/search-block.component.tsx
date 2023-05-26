import { Author, AuthorSkeleton } from "@entities/user";
import type { IAddress } from "@shared/lib";
import { Paper } from "@shared/ui";
import Link from "next/link";
import * as React from "react";

import { useGetAddressFrom } from "../model";
import { SearchInput } from "./search-input.component";
import { UserNotFound } from "./user-not-found.component";
import InfiniteScroll from "react-infinite-scroll-component";

export interface ISearchBlockProperties {}

export function SearchBlock(props: ISearchBlockProperties) {
  const {} = props;
  const [value, setValue] = React.useState<IAddress | string>("");

  const { usernames, isLoading, loadMore, hasMore } = useGetAddressFrom({
    value,
  });

  return (
    <Paper className="rounded-[2rem] h-full">
      <SearchInput onChange={setValue} value={value} />
      {isLoading ? (
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src="/assets/icons/eyesLogo.svg"
            alt="eyes"
            className={"w-24 h-24 animate-bounce"}
          />
          <div className="font-rounded text-4xl font-bold text-heading">
            loading...
          </div>
        </div>
      ) : (
        <div className="">
          <InfiniteScroll
            className="mt-4 gap-y-1 flex flex-col"
            dataLength={usernames?.length ?? 0}
            next={loadMore}
            hasMore={hasMore}
            loader={<AuthorSkeleton />}
          >
            {usernames?.map(({ address }) => {
              return (
                <Link href={`profile/${address}`}>
                  <Author
                    postOwner={{
                      walletAddress: address as IAddress,
                      ensType: 0,
                    }}
                  />
                </Link>
              );
            })}
          </InfiniteScroll>

          {!usernames && value && <UserNotFound />}
        </div>
      )}
    </Paper>
  );
}
