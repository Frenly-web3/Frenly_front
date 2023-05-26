import { UnificationImage } from "@shared/ui";
import * as React from "react";
import { IToken } from "../model/token.entity";
import { useTransformBadgeData } from "@entities/post";

export interface ITokenImageProps extends IToken {}

export function TokenImage(props: ITokenImageProps) {
  const { imageUrl, format, price, name, id } = props;
  const badgeData = useTransformBadgeData({
    tokenId: id,
    communityContractName: name,
  });
  return (
    <>
      <div className={`w-full flex flex-col gap-y-2`}>
        <div className=" w-full aspect-square rounded-2xl overflow-hidden border-2 border-black/10 relative">
          <UnificationImage
            image={imageUrl}
            fileExtension={format as string}
            className="w-full h-full"
          />
          {price && (
            <div className="leading-none px-1 aspect-square h-5 flex flex-col items-center justify-center rounded-full bg-black/60 absolute bottom-2 right-2 z-20">
              <span className="font-medium  text-white font-rounded text-sm z-30">
                {Number(price).toFixed(3)}ETH
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-1 items-center">
          <span className="font-semibold text-sm font-rounded text-black/80">
            {badgeData.communityContractName}
          </span>
          <span className="font-semibold text-sm font-rounded text-black/40">
            #{badgeData.tokenId}
          </span>
        </div>
      </div>
    </>
  );
}
