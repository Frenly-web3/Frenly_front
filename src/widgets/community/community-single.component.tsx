import { useCommunityInfo } from "@entities/community";
import { useUserInfo } from "@entities/user";
import { FollowersModal, SubscriptionStateEnum } from "@features/follow-unfollow-user";
import { Paper } from "@mantine/core";
import type { IAddress } from "@shared/lib";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useAccount } from "wagmi";



interface IProperties {
  id?: string;
}

export const CommunitySingle = (props: IProperties) => {
  const { id } = props;
  const {
    data: community,
    // isError,
    // isLoading
  } = useCommunityInfo({ id });

  const [opened, setOpened] = useState(false);

  const { address } = useAccount();

  const { user } = useUserInfo({ address: address as IAddress });

  return (
    <Paper className="rounded-[2rem] w-60 p-4 flex flex-col max-md:hidden mt-16 h-fit items-start ">
      <div
        className={`rounded-xl mb-2 max-w-[4rem] min-w-[4rem] max-h-[4rem] min-h-[4rem] relative overflow-hidden`}
      >
        <img
          src={
            community
              ? `https://stage.frenly.cc/api/community-content/images/${community.image}`
              : "/assets/icons/feed-frenly.svg"
          }
          alt={`${community?.name} logo`}
        />
      </div>

      <div className={`flex flex-col gap-0`}>
        <div className={`font-rounded text-heading font-semibold text-lg`}>
          {community ? community.name : "following feed"}
        </div>
        <div className={`text-base text-black/60 font-rounded`}>
          {community
            ? community.description
            : "this is a feed with NFT activities of frens you follow"}
        </div>
        <div className={`font-rounded text-black font-medium text-base`}>
          {community ? (
            `${community.membersAmount} frens`
          ) : (
            <button onClick={() => setOpened(true)}>
              {user.totalSubscribers}{' frens'}
            </button>
          )}
           
        </div>
      </div>
      <FollowersModal
        onClose={() => setOpened(false)}
        opened={opened}
        address={address as IAddress}
        initialTab={SubscriptionStateEnum.following}
      />
    </Paper>
  );
};
