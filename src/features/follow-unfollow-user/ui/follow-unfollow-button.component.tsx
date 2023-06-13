import { useCheckIsOwner, type IAddress, type Subscription } from "@shared/lib";
import { IFollowButtonContent, ProfileButton } from "@shared/ui";
import React from "react";

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
  const isOwner = useCheckIsOwner(address);

  return (
    <div className="flex  items-center">
      {!isOwner && (
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
