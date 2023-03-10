import type { IAddress } from "@shared/lib";
import { Avatar } from "@shared/ui";
import React from "react";
import { useEnsName } from "wagmi";

interface IUserCardProperties {
  address: IAddress;
}

export const UserCard = (props: IUserCardProperties) => {
  const { address } = props;

  // const { data: ensAvatar, isLoading: avatarLoading } = useEnsAvatar({
  //   address,
  // });

  const { data: ensName } = useEnsName({
    address,
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <Avatar address={address} className="w-24 aspect-square" />

      {ensName && (
        <div
          className={`text-2xl mb-2 font-semibold text-black font-rounded text-center`}
        >
          {ensName}
        </div>
      )}
    </div>
  );
};
