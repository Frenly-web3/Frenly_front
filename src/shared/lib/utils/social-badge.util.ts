import { SocialType } from "./../types/social.type";
import { useMemo } from "react";

export const useSocialBadgeInfo = ({ social }: { social: SocialType }) => {
  return useMemo(() => {
    return {
      icon: social.replace(".", ""),
    };
  }, [social]);
};
