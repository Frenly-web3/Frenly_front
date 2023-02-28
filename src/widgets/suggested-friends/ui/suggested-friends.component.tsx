import { Author } from "@entities/user";
import { userApi } from "@shared/api";
import { IAddress } from "@shared/lib";
import { Paper } from "@shared/ui";
import * as React from "react";

export interface ISuggestedFriendsProps {}

const mockSuggestedFriends = [
  "0xb44841a1968ab22344c8fa029aa0bb3d24a3dbc5",
  "0x16ef8a3fc841df2f8af42396ca849bc6dc27132b",
  "0x297f0458cdda6a60116eac648ed2419293131114",
  "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
];

export function SuggestedFriends(props: ISuggestedFriendsProps) {
  const { data: suggestionAddresses, isError } =
    userApi.useGetUserSuggestionsQuery();

  return (
    <div className="">
      <Paper className="rounded-[2rem]">
        <h3 className="font-rounded font-semibold text-xl">you may know</h3>
        <h5 className="font-rounded text-black/60 mb-4">
          wallets you interacted with
        </h5>
        <div className="flex flex-col gap-y-2 h-24 overflow-y-scroll">
          {suggestionAddresses &&
            !isError &&
            suggestionAddresses?.length > 0 &&
            suggestionAddresses?.map((address) => {
              return (
                <Author classNames={{ avatar: "w-6" }} address={address} />
              );
            })}
          {((suggestionAddresses && suggestionAddresses?.length == 0) ||
            isError) &&
            mockSuggestedFriends.map((address) => {
              return (
                <Author
                  classNames={{ avatar: "w-6" }}
                  address={address as IAddress}
                />
              );
            })}
        </div>
      </Paper>
    </div>
  );
}
