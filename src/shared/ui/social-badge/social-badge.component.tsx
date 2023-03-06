import { Badge as MantineBadge, BadgeProps } from "@mantine/core";
import { SocialType, useSocialBadgeInfo } from "@shared/lib";
import Link from "next/link";
import * as React from "react";
import { IconsTypes, iconTypes, SocialIcon } from "./social-icon.component";

export interface ISocialBadgeProps extends BadgeProps {
  social: SocialType;
  label: string;
}

export function SocialBadge(props: ISocialBadgeProps) {
  const { social, label } = props;
  const { icon, link } = useSocialBadgeInfo({ social, linkContent: label });
  return icon in iconTypes ? (
    <div>
      <MantineBadge
        {...props}
        unstyled
        classNames={{
          leftSection: "w-1 aspect-square",
          root: "rounded-full border-2 border-black/20 w-fit",
        }}
        // component="a"
      >
        {
          <Link href={link} target="_blank" className="flex items-center gap-x-1 p-1">
            <SocialIcon
              className="w-4 aspect-square"
              name={icon as IconsTypes}
            />
            <span className="font-rounded font-semibold">{label}</span>
          </Link>
        }
      </MantineBadge>
    </div>
  ) : (
    <></>
  );
}
