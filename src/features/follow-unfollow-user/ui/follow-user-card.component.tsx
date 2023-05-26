import { SmallUserCard } from "@entities/user";
import { Subscription } from "@shared/lib";
import { ProfileButton } from "@shared/ui";
import * as React from "react";
import { useAccount } from "wagmi";
import { useFollowUnfollowUser } from "../model";
import { IUserWalletDto } from "@shared/api";

export interface IFollowUserCardProps {
  creator: IUserWalletDto;
}

export function FollowUserCard(props: IFollowUserCardProps) {
  const { creator } = props;
  const { address: currentUserAddress } = useAccount();
  const { followUnfollowHandler, followUnfollowState } = useFollowUnfollowUser({
    address: creator.walletAddress,
  });  

  return (
    <div className="flex justify-between items-center ">
      <SmallUserCard address={creator.walletAddress} />
      {currentUserAddress?.toLowerCase() !== creator.walletAddress ? (
        <ProfileButton
          classNames="mx-0 mb-0"
          followUnfollowState={followUnfollowState as Subscription}
          onClick={followUnfollowHandler}
        />
      ) : null}
    </div>
  );
}
