import * as React from "react";
import { IAddress, ImageProviderEnum } from "@shared/lib";
import { useGetCollectionByAddress } from "../model";
import { UnificationImage } from "@shared/ui";
import Link from "next/link";

export interface ICollectionInfoProps {
  collectionAddress: IAddress;
}

export function CollectionInfo(props: ICollectionInfoProps) {
  const { collectionAddress } = props;

  const { imageUrl, description, address } = useGetCollectionByAddress({
    address: collectionAddress,
  });
  return (
    <div className="flex gap-4 w-full border-b-[1px] border-b-black/20 pb-4">
      <div className="w-16 h-16 aspect-square">
        <UnificationImage
          image={imageUrl}
          fileProvider={ImageProviderEnum.ALCHEMY}
          className="w-full h-full rounded-full overflow-hidden"
        />
      </div>

      <div className="flex flex-col gap-y-4 w-full">
        <p className="font-rounded font-semibold text-xl leading-6">
          {description}
        </p>
        <Link
          href={`https://rarible.com/collection/${address}`}
          className="w-[168px]"
        >
          <div className="font-medium text-white flex gap-1 items-center bg-main py-[3px] px-3 rounded-full">
            <span>explore collection</span>
            <span className="font-icon">north_east</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
