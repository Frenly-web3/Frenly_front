import { Author } from "@entities/user";
import type { IAddress } from "@shared/lib";
import { Paper } from "@shared/ui";
import Link from "next/link";
import * as React from "react";

import { useGetAddressFrom } from "../model";
import { SearchInput } from "./search-input.component";
import { UserNotFound } from "./user-not-found.component";

export interface ISearchBlockProperties {}

export function SearchBlock(props: ISearchBlockProperties) {
  const {} = props;
  const [value, setValue] = React.useState<IAddress | string>("");
  const { address, isLoading } = useGetAddressFrom({ value });

  return (
    <Paper className="rounded-[2rem] aspect-square md:min-w-[35rem]">
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
        <div className="mt-4">
          {address && (
            <Link href={`profile/${address}`}>
              <Author address={address as IAddress} />
            </Link>
          )}
          {value.length > 0 && address == null && <UserNotFound />}
        </div>
      )}
    </Paper>
  );
}
