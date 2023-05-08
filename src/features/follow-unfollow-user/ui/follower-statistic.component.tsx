import { UserStatistic, useUserInfo } from "@entities/user";
import { IAddress, UsernameTypeEnum } from "@shared/lib";
import dynamic from "next/dynamic";
import * as React from "react";
import { SubscriptionStateEnum, useFollowUnfollowUser } from "../model";

export interface IFollowerStatisticProps {
  address: IAddress;
}

const FollowersModal = dynamic(() =>
  import("./followers-modal.component").then((mod) => mod.FollowersModal)
);

export function FollowerStatistic(props: IFollowerStatisticProps) {
  const { address } = props;

  const {
    user: { walletAddress, usernameType },
  } = useUserInfo({ address });

  const { followerAmount, subscriberAmount } = useFollowUnfollowUser({
    address,
  });

  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [initialTab, setInitialTab] = React.useState<SubscriptionStateEnum>(
    SubscriptionStateEnum.followers
  );

  const openModalHandler = (initialTab: SubscriptionStateEnum) => {
    setInitialTab(initialTab);
    setIsOpenModal(true);
  };

  return (
    <div className="flex md:gap-x-8">
      <button
        onClick={() => openModalHandler(SubscriptionStateEnum.followers)}
        className="flex md:justify-between mb-4 w-1/2 justify-center"
      >
        <UserStatistic label="followers" count={followerAmount ?? 0} />
      </button>
      <button
        onClick={() => openModalHandler(SubscriptionStateEnum.following)}
        className="flex md:justify-between mb-4 w-1/2 justify-center"
      >
        <UserStatistic label="following" count={subscriberAmount ?? 0} />
      </button>
      <FollowersModal
        initialTab={initialTab}
        creator={{ walletAddress, ensType: usernameType as UsernameTypeEnum }}
        opened={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </div>
  );
}
