import * as React from "react";
import { ICollection } from "../model";
import { UnificationImage } from "@shared/ui";
import { IAddress, ImageProviderEnum } from "@shared/lib";
import Link from "next/link";

export interface ICollectionCardProps extends ICollection {
  userAddress: IAddress
}

export function CollectionCard(props: ICollectionCardProps) {
  const { imageUrl, name, previewUrl, totalBalance, previewFormat, address,userAddress } =
    props;

  return (
    <Link href={`/collections/${address}?user=${userAddress}`}>
      <div className="flex flex-col gap-3 max-md:items-center">
        <div className="">
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <UnificationImage
                image={imageUrl}
                fileProvider={ImageProviderEnum.OPENSEA}
                className="w-full h-full"
              />
            </div>
            <h5 className="font-rounded font-semibold text-xl w-[123px] truncate">
              {name}
            </h5>
          </div>
        </div>
        <div className="relative w-40 h-44">
          <UnificationImage
            image={previewUrl}
            fileProvider={ImageProviderEnum.ALCHEMY}
            fileExtension={previewFormat}
            className="absolute border-2 top-0 w-40 h-40 rounded-2xl overflow-hidden z-10 origin-center"
          />
          <UnificationImage
            image={previewUrl}
            fileProvider={ImageProviderEnum.ALCHEMY}
            fileExtension={previewFormat}
            className="absolute border-2 top-0 origin-top-left rotate-3 left-0 w-40 h-40 rounded-2xl overflow-hidden blur-[1px]"
          />
          <UnificationImage
            image={previewUrl}
            fileProvider={ImageProviderEnum.ALCHEMY}
            fileExtension={previewFormat}
            className="absolute border-2 top-0 origin-top-right -rotate-3 right-0 w-40 h-40 rounded-2xl overflow-hidden blur-[1px]"
          />
          <div className="leading-none px-1 aspect-square h-5 flex flex-col items-center justify-center rounded-full bg-black/60 absolute bottom-6 right-2 z-20">
            <span className="font-medium  text-white font-rounded text-sm z-30">
              {totalBalance}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
