import { UserStatistic } from "@entities/user";
import type { IAddress, Subscription } from "@shared/lib";
import { AdaptiveModal, ProfileButton } from "@shared/ui";
import React, { useState } from "react";
import { useAccount } from "wagmi";

import { useFollowUnfollowUser } from "../model";
import { FollowersModal } from "./followers-modal.component";

interface IFollowUnfollowButtonProperties {
  address: IAddress;
}

export const FollowUnfollowButton = (
  props: IFollowUnfollowButtonProperties
) => {
  const { address } = props;
  const {
    followUnfollowHandler,
    followUnfollowState,
    followerAmount,
    subscriberAmount,
  } = useFollowUnfollowUser({ address });

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { address: connectedAddress } = useAccount();
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => setIsOpenModal(true)}
        className="flex justify-between w-40 mb-4"
      >
        <UserStatistic label="followers" count={followerAmount ?? 0} />
        <UserStatistic label="following" count={subscriberAmount ?? 0} />
      </button>
      {connectedAddress != address && (
          <ProfileButton
            followUnfollowState={followUnfollowState as Subscription}
            onClick={followUnfollowHandler}
          />
      )}
      <FollowersModal
        address={address}
        opened={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </div>
  );
};
