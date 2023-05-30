import { clsx } from "@mantine/core";
import type { IAddress } from "@shared/lib";

import { Avatar, Name } from "@shared/ui";
import Link from "next/link";
import * as React from "react";

import { useUserInfo } from "../model";

export interface ISmallUserCardProperties {
  address: IAddress;
  chosenInMenu?: boolean;
  isMenu?: boolean;
}

export function SmallUserCard(props: ISmallUserCardProperties) {
  const { address, chosenInMenu = false, isMenu = false } = props;
  const {
    user: { usernameType, walletAddress },
  } = useUserInfo({ address });

  return (
    <Link
      href={`/profile/${address}`}
      className={clsx("flex items-center p-2 rounded-full ", {
        "md:hover:bg-black/5": isMenu,
      })}
    >
      <Avatar
        address={walletAddress}
        usernameType={usernameType}
        className={clsx(`mr-2`, {
          "max-md:w-5 md:w-4": !isMenu,
          "w-4 mr-3": isMenu,
        })}
      />

      <Name
        address={walletAddress}
        usernameType={usernameType}
        className={clsx(`text-base  font-semibold font-rounded text-center`, {
          "text-black": (chosenInMenu && isMenu) || !isMenu,
          "text-black/40": !chosenInMenu && isMenu,
          "max-md:hidden": isMenu,
        })}
      />
    </Link>
  );
}
