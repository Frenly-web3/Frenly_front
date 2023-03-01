import { IAction } from "@entities/action";
import { Badge } from "@shared/ui";
import * as React from "react";
import { useTransformBadgeData } from "../lib";

export interface IPostBadgeProps
  extends Pick<IAction, "community" | "tokenId"> {
  title: React.ReactNode;
}

export function PostBadge(props: IPostBadgeProps) {
  const { community, tokenId, } = props;

  const [, setOpenModal] = React.useState(false);

 

  const badgeData = useTransformBadgeData({tokenId, communityContractName: community.contractName})

  return (
    <div>
      <button onClick={() => setOpenModal(true)}>
        <Badge
          withIcon
          className="z-20 cursor-pointer"
        >
          <span>
            {badgeData.communityContractName}
            <span className="text-white/60">#{badgeData.tokenId}</span>
          </span>
        </Badge>
      </button>      
    </div>
  );
}
