import { clsx } from "@mantine/core";
import type { IAddress } from "@shared/lib";
import { shortAddress } from "@shared/lib";
import Link from "next/link";
import * as React from "react";
import { useEnsAvatar, useEnsName } from "wagmi";

export interface ISmallUserCardProperties {
  address: IAddress;
  chosenInMenu?: boolean;
  isMenu?: boolean;
}

export function SmallUserCard(props: ISmallUserCardProperties) {
  const { address, chosenInMenu = false, isMenu = false } = props;
  const { data: ensAvatar, isLoading: avatarLoading } = useEnsAvatar({
    address,
  });

  const { data: ensName } = useEnsName({
    address,
  });

  return (
    <Link
      href={`/profile/${address}`}
      className={clsx("flex items-center p-2 rounded-full ", {
        "hover:bg-black/5": isMenu,
      })}
    >
      <img
        src={ensAvatar || "/assets/images/temp-avatar.png"}
        className={clsx(`align-center mr-2 aspect-square ${
          chosenInMenu && "border-2"
        } rounded-full ${avatarLoading && "animate-pulse"}`,
        {
          'max-md:w-5 md:w-4': !isMenu,
          'w-4': isMenu
        }
        )}
        alt="avatar"
      />
      <div
        className={clsx(`text-base  font-semibold font-rounded text-center`, {
          "text-black": (chosenInMenu && isMenu) || !isMenu,
          "text-black/40": !chosenInMenu && isMenu,
          "max-md:hidden": isMenu,
        })}
      >
        {ensName || shortAddress({ address, with0x: true })}
      </div>
    </Link>
  );
}
