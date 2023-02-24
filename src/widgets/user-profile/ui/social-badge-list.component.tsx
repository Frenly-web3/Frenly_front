import { SocialType } from "@shared/lib";
import { SocialBadge } from "@shared/ui";
import * as React from "react";

export interface ISocialBadgeListProps {
  socials: [string, string | undefined][];
}

export function SocialBadgeList(props: ISocialBadgeListProps) {
  const { socials } = props;
  console.log(Object.fromEntries(socials));
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-3">
      {socials.map((social) => {
        return (
          <SocialBadge social={social[0] as SocialType}>
            {social[1]}
          </SocialBadge>
        );
      })}
    </div>
  );
}