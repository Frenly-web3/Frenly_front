import { IAction } from "@entities/action";
import {
  // IAddress,
  TransferTypeEnum,
} from "@shared/lib";
import { UnificationImage } from "@shared/ui";
import React from "react";
// import { useRenderMessage } from "../lib";
import { PostBadge } from "./post-badge.component";

interface IPostContentProperties extends IAction {
  chosedImage?: number;
  imagesCount?: number;
  transferType: TransferTypeEnum;
  userCard?: React.ReactNode;
}
export const PostImage = (props: IPostContentProperties) => {
  const { image, community, tokenId, userCard, fileExtension } = props;

  return (
    <div className="">
      <div className="relative overflow-hidden">
        <UnificationImage
          image={image}
          fileExtension={fileExtension as string}
        />
        <div className="absolute left-3 bottom-3 ">
          <PostBadge
            community={community}
            tokenId={tokenId}
            title={<div className="flex items-center">{userCard}</div>}
          />
        </div>
      </div>
    </div>
  );
};
