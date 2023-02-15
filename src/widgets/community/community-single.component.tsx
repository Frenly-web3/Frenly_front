import { useCommunityInfo } from "@entities/community";
import { useUserInfo } from "@entities/user";
import { Paper } from "@mantine/core";
import type { IAddress } from "@shared/lib";
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

  const { address } = useAccount();

  const { user } = useUserInfo({ address: address as IAddress });

  return (
    <Paper className="rounded-[2rem] w-60 p-8 flex flex-col max-md:hidden mt-16 h-fit items-start sticky top-4">
      <div
        className={`rounded-xl mb-2  max-w-[4rem] min-w-[4rem] max-h-[4rem] min-h-[4rem] relative overflow-hidden`}
      >
        <img
          src={
            community
              ? `https://stage.frenly.cc/api/community-content/images/${community.image}`
              : "/assets/images/community-feed.png"
          }
          alt={`${community?.name} logo`}
          // layout={'fill'}
        />
      </div>

      <div className={`flex flex-col gap-0`}>
        <div className={`font-rounded text-heading font-semibold text-lg`}>
          {community ? community.name : "following feed"}
        </div>
        <div className={`text-base`}>
          {community
            ? community.description
            : "this is a feed with NFT activities of frens you follow"}
        </div>
        <div className={`font-compact text-black font-medium text-base`}>
          {community ? community.membersAmount : user.totalSubscribers} frens
        </div>
      </div>
    </Paper>
  );
};
