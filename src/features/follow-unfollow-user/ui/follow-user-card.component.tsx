import { SmallUserCard } from "@entities/user";
import { IAddress, Subscription } from "@shared/lib";
import { ProfileButton } from "@shared/ui";
import * as React from "react";
import { useAccount } from "wagmi";
import { useFollowUnfollowUser } from "../model";

export interface IFollowUserCardProps {
  address: IAddress;
}

export function FollowUserCard(props: IFollowUserCardProps) {
  const { address } = props;
  const { address: currentUserAddress } = useAccount();
  const { followUnfollowHandler, followUnfollowState } = useFollowUnfollowUser({
    address,
  });

  return (
    <div className="flex justify-between items-center ">
      <SmallUserCard address={address} />
      {currentUserAddress?.toLowerCase() !== address ? (
        <ProfileButton
          classNames="mx-0 mb-0"
          followUnfollowState={followUnfollowState as Subscription}
          onClick={followUnfollowHandler}
        />
      ) : null}
    </div>
  );
}
