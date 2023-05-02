import { UnificationImage } from "@shared/ui";
import * as React from "react";
import { IAction } from "../model";

export interface ISmallActionProps extends IAction {}

export function SmallAction(props: ISmallActionProps) {
  const {
    image,
    amountInCrypto,
    saleCryptoSymbol,
    community,
    tokenId,
    fileExtension,
    fileProvider
  } = props;

  return (
    <div className="flex gap-4">
      <div className="flex gap-4">
        <div className="w-16 aspect-square rounded-2xl overflow-hidden">
          <UnificationImage
            image={image}
            className={"w-full"}
            fileExtension={fileExtension as string}
            fileProvider={fileProvider}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-black font-rounded font-semibold">
            {community.contractName ?? "untitled"} #{tokenId}
          </span>
          <div className="flex items-center">
            <div className="rounded-full overflow-hidden w-5 aspect-square mr-2">
              <UnificationImage
                image={community.image }
                fileExtension={fileExtension as string}
                fileProvider={fileProvider}
              />
            </div>
            <span className="text-black/60 font-rounded text-sm font-normal">
              {community.contractName}
            </span>
          </div>
        </div>
      </div>
      {amountInCrypto && (
        <div className="font-rounded font-semibold bg-black/5 py-2 px-3 rounded-full w-fit h-fit max-md:hidden">
          {Number(amountInCrypto).toFixed(2)} {saleCryptoSymbol}
        </div>
      )}
    </div>
  );
}
