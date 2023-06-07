import { Avatar, EditFile, IAvatarProperties } from "@shared/ui";
import * as React from "react";
import { clsx } from "@mantine/core";
import { useCheckIsOwner } from "@shared/lib";
import { useSetAvatar } from "../model";

export interface IUploadAvatarProps extends IAvatarProperties {}

export function UploadAvatar(props: IUploadAvatarProps) {
  const { ...avatarProps } = props;
  const isOwner = useCheckIsOwner(avatarProps.address);
  const { setAvatar, isLoading } = useSetAvatar();

  return (
    <div
      className={clsx(
        "relative flex items-center justify-center group/edit",
        avatarProps.className
      )}
    >
      {isOwner && (
        <EditFile
          onChange={setAvatar}
          className={clsx({
            "group-hover/edit:visible md:invisible z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2":
              !isLoading,
            "z-10": isLoading,
          })}
          isLoading={isLoading}
        />
      )}
      <Avatar {...avatarProps} className="w-full" />
    </div>
  );
}
