import { Badge as MantineBadge, BadgeProps } from "@mantine/core";
import { SocialType, useSocialBadgeInfo } from "@shared/lib";
import Link from "next/link";
import * as React from "react";
import { IconsTypes, iconTypes, SocialIcon } from "./social-icon.component";
import { EditButton } from "../edit-button";

export interface ISocialBadgeProps extends BadgeProps {
  social: SocialType;
  label: string;
  isEdit: boolean;
}

export function SocialBadge(props: ISocialBadgeProps) {
  const { social, label, isEdit } = props;
  const { icon, link } = useSocialBadgeInfo({ social, linkContent: label });
  return icon in iconTypes ? (
    <div className="min-w-8">
      <MantineBadge
        {...props}
        unstyled
        classNames={{
          leftSection: "w-1 aspect-square",
          root: "min-w-16",
        }}
        // component="a"
      >
        {isEdit ? (
          <EditButton
            onClick={() => {
              console.log("DELETE");
            }}
            className="w-full"
          >
            <div className="flex gap-1 items-center justify-center min-w-16">
              <SocialIcon
                className="w-4 aspect-square"
                name={icon as IconsTypes}
              />
              <span className="font-rounded font-semibold">
                {label}
              </span>
              <span className="font-icon">
                close
              </span>
            </div>
          </EditButton>
        ) : (
          <Link
            href={link}
            target="_blank"
            className="flex items-center gap-x-1 p-1 border-2 rounded-full  border-black/20"
          >
            <SocialIcon
              className="w-4 aspect-square"
              name={icon as IconsTypes}
            />
            <span className="font-rounded font-semibold">{label}</span>
          </Link>
        )}
      </MantineBadge>
    </div>
  ) : (
    <></>
  );
}
