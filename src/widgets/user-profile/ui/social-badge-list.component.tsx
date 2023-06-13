import { SocialType } from "@shared/lib";
import { SocialBadge } from "@shared/ui";
import * as React from "react";

export interface ISocialBadgeListProps {
  socials: [string, string | undefined][];
  children?: React.ReactNode;
  isEdit?: boolean;
  onClickBadge?: ({
    type,
    username,
  }: {
    type: string;
    username: string;
  }) => void;
  name: string;
}

export function SocialBadgeList(props: ISocialBadgeListProps) {
  const { socials, children, isEdit = false, onClickBadge, name } = props;

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-3">
      {socials?.map((social, index) => {
        return (
          <SocialBadge
            isEdit={isEdit}
            onClick={() => {
              if (!onClickBadge) return;
              onClickBadge({ type: social[0] as string, username: name });
            }}
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
