import Link from "next/link";
import * as React from "react";

export interface ISocialLinkBadgeProps {
  icon: string;
  content: string;
  link: string;
}

export function SocialLinkBadge(props: ISocialLinkBadgeProps) {
  const { content, icon, link } = props;
  return (
    <Link href={link} target="_blank" className="rounded-full bg-black flex items-center gap-1 pt-[3px] pb-[5px] px-3">
      <span>{icon}</span>
      <span className="font-semibold text-white font-rounded leading-tight tracking-tight">
        {content}
      </span>
    </Link>
  );
}
