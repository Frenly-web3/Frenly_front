import { Badge as MantineBadge, BadgeProps } from "@mantine/core";
import { SocialType, useSocialBadgeInfo } from "@shared/lib";
import * as React from "react";
import { IconsTypes, iconTypes, SocialIcon } from "./social-icon.component";

export interface ISocialBadgeProps extends BadgeProps {
  social: SocialType;
}

export function SocialBadge(props: ISocialBadgeProps) {
  const { social, children } = props;
  const { icon } = useSocialBadgeInfo({ social });
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
          <div className="flex items-center gap-x-1 p-1">
            <SocialIcon
              className="w-4 aspect-square"
              name={icon as IconsTypes}
            />
            <span className="font-rounded font-semibold">{children}</span>
          </div>
        }
      </MantineBadge>
    </div>
  ) : (
    <></>
  );
}
