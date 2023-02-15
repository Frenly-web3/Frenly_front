import { IAction } from "@entities/action";
import {
  IAddress,
  TransferTypeEnum,
  useUnificationFormatImage,
} from "@shared/lib";
import { Badge } from "@shared/ui";
import React from "react";
import { useRenderMessage } from "../lib";
import { PostBadge } from "./post-badge.component";

interface IPostContentProperties extends IAction {
  chosedImage?: number;
  imagesCount?: number;
  transferType: TransferTypeEnum;
  userCard?: React.ReactNode
  
}
export const PostImage = (props: IPostContentProperties) => {
  const {
    image,
    chosedImage,
    imagesCount,
    community,
    tokenId,
    fromAddress,
    toAddress,
    amountInCrypto,
    amountInUsd,
    saleCryptoSymbol,
    transferType,
    userCard
  } = props;

  const unificationImage = useUnificationFormatImage({ image });

  const renderMessage = useRenderMessage({
    contractAddress: community.contractAddress as IAddress,
    from: fromAddress as IAddress,
    postType: transferType,
    to: toAddress as IAddress,
    countActions: imagesCount as number,
    amountInCrypto: amountInCrypto as string,
    saleCryptoSymbol: saleCryptoSymbol,
    amountInUsd: amountInUsd as string,
  });

  return (
    <div className="">
      <div className="relative overflow-hidden">
        {unificationImage ? (
          <>
            {unificationImage.type === "image" ? (
              <img
                src={unificationImage.url.toString()}
                alt={unificationImage.url.toString()}
                className="m-auto"
              />
            ) : (
              <video src={unificationImage.url.toString()} />
            )}
          </>
        ) : (
          <div className="flex flex-col p-10 gap-2 items-center justify-center aspect-square w-full bg-gray">
            <img
              src={"/assets/icons/sadEyes.svg"}
              alt="Sad eyes logo"
              className="w-24 h-full "
            />
            <span className="text-sm font-normal text-white">
              Currently we don{"'"}t support this type of token :{"("}
            </span>
          </div>
        )}
        {imagesCount && (
          <Badge className="absolute right-3 top-3 z-50">
            {(chosedImage as number) + 1} / {imagesCount}
          </Badge>
        )}
        <PostBadge
          community={community}
          tokenId={tokenId}
          title={<div className="flex items-center">{userCard}</div>}
        />
      </div>
    </div>
  );
};
