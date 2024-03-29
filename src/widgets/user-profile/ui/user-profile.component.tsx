import { useEnsInfo, useGetFrenInfo, useUserInfo } from "@entities/user";
import {
  FollowerStatistic,
  FollowUnfollowButton,
} from "@features/follow-unfollow-user";
import { InfoUploadComponent } from "@features/update-user-info";
import { IAddress, UsernameTypeEnum, useCheckIsOwner } from "@shared/lib";
import React from "react";
import { SocialBadgeList } from "./social-badge-list.component";
import { EditModal } from "@features/edit-profile/ui/edit-modal.component";

interface IUserProfileWidgetProperties {
  address: IAddress;
}

export const UserProfileWidget = (props: IUserProfileWidgetProperties) => {
  const { address } = props;
  const isOwner = useCheckIsOwner(address);
  const { name, description, social } = useEnsInfo({ address });
  const { socials: frenSocials, description: frenDescription } = useGetFrenInfo(
    { address }
  );
  const { user } = useUserInfo({ address });

  return (
    <div className="p-4 top-0 bg-white rounded-[2rem] relative">
      {isOwner && user.usernameType === UsernameTypeEnum.FRENLY && (
        <EditModal
          userWallet={{
            walletAddress: address,
            ensType: UsernameTypeEnum.FRENLY,
          }}
        />
      )}
      <div className="flex items-start justify-between">
        <div className="max-md:w-full">
          <InfoUploadComponent
            address={address}
            name={name}
            description={description}
            usernameType={user.usernameType}
          >
            <FollowerStatistic address={address} />
          </InfoUploadComponent>
          <p className="font-medium font-rounded md:ml-32 mb-4 text-black/80">
            {user.usernameType === UsernameTypeEnum.FRENLY
              ? frenDescription
              : description}
          </p>
        </div>
        <FollowUnfollowButton className="max-md:hidden" address={address} />
      </div>

      {/* {(user.usernameType === UsernameTypeEnum.ETH ||
        user.usernameType === null) && ( */}
      <div className="md:ml-32 max-md:mb-4">
        <SocialBadgeList
          socials={
            (user.usernameType === UsernameTypeEnum.FRENLY
              ? frenSocials
              : social) as [string, string | undefined][]
          }
        />
      </div>
      {/* )} */}

      <FollowUnfollowButton className="md:hidden w-full" address={address} />
    </div>
  );
};
