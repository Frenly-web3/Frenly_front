import { IAction } from "@entities/action";
import { useMediaQuery } from "@mantine/hooks";
import { AdaptiveModal, Badge, Drawer, Modal } from "@shared/ui";
import * as React from "react";
import { useTransformBadgeData } from "../lib";

export interface IPostBadgeProps
  extends Pick<IAction, "community" | "tokenId"> {
  title: React.ReactNode;
}

export function PostBadge(props: IPostBadgeProps) {
  const { community, tokenId, title } = props;

  const [openedModal, setOpenModal] = React.useState(false);

 

  const badgeData = useTransformBadgeData({tokenId, communityContractName: community.contractName})

  return (
    <div>
      <button onClick={() => setOpenModal(true)}>
        <Badge
          withIcon
          className="absolute left-3 bottom-9 z-20 cursor-pointer"
        >
          <span>
            {badgeData.communityContractName}
            <span className="text-white/60">#{badgeData.tokenId}</span>
          </span>
        </Badge>
      </button>

    
        <AdaptiveModal
          opened={openedModal}
          onClose={() => setOpenModal(false)}
          title={title}
        >s</AdaptiveModal>
      
    </div>
  );
}
