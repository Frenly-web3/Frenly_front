import { useEnsInfo } from "@entities/user";
import {
  FollowerStatistic,
  FollowUnfollowButton,
} from "@features/follow-unfollow-user";
import { InfoUploadComponent } from "@features/update-user-info";
import type { IAddress } from "@shared/lib";
import React from "react";
import { SocialBadgeList } from "./social-badge-list.component";

interface IUserProfileWidgetProperties {
  address: IAddress;
}

export const UserProfileWidget = (props: IUserProfileWidgetProperties) => {
  const { address } = props;
  const { name, description, social } = useEnsInfo({ address });

  return (
    <div className=" md:ml-4 p-4 top-0 bg-white rounded-[2rem] lg:w-[37rem] relative">
      <div className="flex items-start justify-between">
        <div className="max-md:w-full">
          <InfoUploadComponent
            address={address}
            name={name}
            description={description}
          >
            <FollowerStatistic address={address} />
          </InfoUploadComponent>
          <p className="font-medium font-rounded md:ml-32 mb-4 text-black/80">
            {description}
          </p>
        </div>
        <FollowUnfollowButton className="max-md:hidden" address={address} />
      </div>
      <div className="md:ml-32 max-md:mb-4">
        <SocialBadgeList socials={social} />
      </div>

      <FollowUnfollowButton className="md:hidden w-full" address={address} />
    </div>
  );
};
