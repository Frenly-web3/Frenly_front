import type { IAddress, Subscription } from "@shared/lib";
import { ProfileButton } from "@shared/ui";
import React from "react";
import { useAccount } from "wagmi";

import { useFollowUnfollowUser } from "../model";

interface IFollowUnfollowButtonProperties {
  address: IAddress;
  className?: string;
}

export const FollowUnfollowButton = (
  props: IFollowUnfollowButtonProperties
) => {
  const { address, className } = props;
  const { followUnfollowHandler, followUnfollowState } = useFollowUnfollowUser({
    address,
  });

  const { address: connectedAddress } = useAccount();

  return (
    <div className="flex  items-center">
      {connectedAddress != address && (
        <ProfileButton
          classNames={className}
          followUnfollowState={followUnfollowState as Subscription}
          onClick={followUnfollowHandler}
        />
      )}
    </div>
  );
};
