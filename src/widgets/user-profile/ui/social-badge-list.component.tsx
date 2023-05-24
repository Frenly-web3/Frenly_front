import { SocialType } from "@shared/lib";
import { SocialBadge } from "@shared/ui";
import * as React from "react";

export interface ISocialBadgeListProps {
  socials: [string, string | undefined][];
  children?: React.ReactNode;
}

export function SocialBadgeList(props: ISocialBadgeListProps) {
  const { socials, children } = props;


  return (
    <div className="flex flex-wrap gap-x-2 gap-y-3">
      {socials?.map((social, index) => {
        return (
          <SocialBadge
            key={index}
            social={social[0] as SocialType}
            label={social[1] as string}
          />
        );
      })}
      {children}
    </div>
  );
}
