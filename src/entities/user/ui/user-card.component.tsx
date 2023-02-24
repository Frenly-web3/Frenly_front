import { Tooltip } from "@mantine/core";
import type { IAddress } from "@shared/lib";
import { shortAddress } from "@shared/lib";
import React, { useState } from "react";
import { useEnsAvatar, useEnsName, useEnsResolver } from "wagmi";
import { useEnsInfo } from "../model";
import { Avatar } from "./avatar.component";

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

  const info = useEnsInfo({ address });
  
  console.log("🚀 ~ file: user-card.component.tsx:25 ~ UserCard ~ info:", info);

  const [opened, setOpened] = useState(false);

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
