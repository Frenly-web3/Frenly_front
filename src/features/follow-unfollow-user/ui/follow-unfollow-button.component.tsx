import type { IAddress, Subscription } from "@shared/lib";
import { IFollowButtonContent, ProfileButton } from "@shared/ui";
import React from "react";
import { useAccount } from "wagmi";

import { useFollowUnfollowUser } from "../model";

interface IFollowUnfollowButtonProperties {
  address: IAddress;
  className?: string;
  followButtonContent?: IFollowButtonContent; 
}

export const FollowUnfollowButton = (
  props: IFollowUnfollowButtonProperties
) => {
  const { address, className, followButtonContent } = props;
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
          followButtonContent={followButtonContent}
        />
      )}
    </div>
  );
};
