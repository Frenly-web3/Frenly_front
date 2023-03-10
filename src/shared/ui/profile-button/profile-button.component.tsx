import { clsx } from "@mantine/core";
import { Subscription } from "@shared/lib";
import React from "react";
import { IFollowButtonContent } from "./model";

interface IProfileButtonProperties extends React.ComponentProps<"button"> {
  followUnfollowState: Subscription;
  followButtonContent?: IFollowButtonContent;
  classNames?: string;
}

export const ProfileButton = (props: IProfileButtonProperties) => {
  const { followUnfollowState, classNames, followButtonContent } = props;
  return (
    <button
      className={clsx(
        `rounded-full flex items-center ${
          followUnfollowState === Subscription.FOLLOW ? "bg-main" : "bg-error"
        } py-2 text-white text-sm font-semibold font-rounded px-4`,
        classNames
      )}
      {...props}
    >
      <div className="m-auto">
        {followButtonContent ? (
          <span className="text-white">
            {followUnfollowState === Subscription.FOLLOW
              ? followButtonContent.followContent.content
              : followButtonContent.unfollowContent.content}
          </span>
        ) : (
          <>
            <span className="text-white/60 mr-2">
              {followUnfollowState === Subscription.FOLLOW ? "+" : "-"}
            </span>{" "}
            <>{followUnfollowState?.toLowerCase()}</>
          </>
        )}
      </div>
    </button>
  );
};
