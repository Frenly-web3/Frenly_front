import { SmallUserCard } from "@entities/user";
import { IAddress, Subscription } from "@shared/lib";
import { ProfileButton } from "@shared/ui";
import * as React from "react";
import { useFollowUnfollowUser } from "../model";

export interface IFollowUserCardProps {
  address: IAddress;
}

export function FollowUserCard(props: IFollowUserCardProps) {
  const { address } = props;
  const { followUnfollowHandler, followUnfollowState } = useFollowUnfollowUser({
    address,
  });
  return (
    <div className="flex justify-between items-center ">
      <SmallUserCard address={address} />
      <ProfileButton
      classNames="mx-0 mb-0"
        followUnfollowState={followUnfollowState as Subscription}
        onClick={followUnfollowHandler}
      />
    </div>
  );
}
