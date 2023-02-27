import { Author } from "@entities/user";
import { userApi } from "@shared/api";
import { IAddress } from "@shared/lib";
import { Paper } from "@shared/ui";
import * as React from "react";

export interface ISuggestedFriendsProps {}

export function SuggestedFriends(props: ISuggestedFriendsProps) {
  const { data: suggestionAddresses } = userApi.useGetUserSuggestionsQuery();

  return (
    <div className="">
      {suggestionAddresses && suggestionAddresses?.length > 0 && (
        <Paper className="rounded-[2rem]">
          <h3 className="font-rounded font-semibold text-xl">you may know</h3>
          <h5 className="font-rounded text-black/60 mb-4">
            wallets you interacted with
          </h5>
          <div className="flex flex-col gap-y-2">
            {suggestionAddresses?.map((address) => {
              return (
                <Author classNames={{ avatar: "w-6" }} address={address} />
              );
            })}
          </div>
        </Paper>
      )}
    </div>
  );
}
