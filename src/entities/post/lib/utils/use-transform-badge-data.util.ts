import { IAction } from "@entities/action";
import { useMemo } from "react";

interface ItransformBadgeDataProperties extends Pick<IAction, "tokenId"> {
  communityContractName: string | null;
}

export const useTransformBadgeData = ({
  tokenId,
  communityContractName,
}: ItransformBadgeDataProperties) =>
  useMemo(() => {
    let transformedTokenId: string;
    let transformedCommunityContractName: string = communityContractName ? communityContractName + ' ' : 'Untitled ';

    console.log(typeof tokenId);
    if (typeof tokenId == "string") {
      if (tokenId.length > 10) {
        transformedTokenId = `${tokenId.slice(0, 4)}...${tokenId.slice(-4)}`;
      } else {
        transformedTokenId = tokenId;
      }
    } else transformedTokenId = `${tokenId}`;

    return {
      tokenId: transformedTokenId,
      communityContractName: transformedCommunityContractName,
    };
  }, []);
