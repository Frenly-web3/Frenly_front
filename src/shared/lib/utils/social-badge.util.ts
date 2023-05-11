import { SocialType } from "@shared/lib";
import { useMemo } from "react";

export const useSocialBadgeInfo = ({
  social,
  linkContent,
}: {
  social: SocialType;
  linkContent: string;
}) => {
  return useMemo(() => {
    let commonLink;

    switch (social) {
      case "url":
        commonLink = `https://${linkContent}`;
        break;
      case "email":
        commonLink = `mailto: ${linkContent}`;
        break;
      case "org.telegram":
        commonLink = `https://t.me/${linkContent}`;
        break;
      case "com.instagram":
        commonLink = `https://www.instagram.com/${linkContent}`;
        break;
      case "com.twitter":
        commonLink = `${linkContent}`;
        break;
      default:
        commonLink = "";
        break;
    }

    return {
      icon: social.replace(".", ""),
      link: commonLink,
    };
  }, [social, linkContent]);
};
