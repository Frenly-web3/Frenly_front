import { UnificationImage } from "@shared/ui";
import * as React from "react";
import { IAction } from "../model";

export interface IActionCardProps extends IAction {}

export function ActionCard(props: IActionCardProps) {
  const {
    amountInCrypto,
    saleCryptoSymbol,
    image,
    community,
    tokenId,
    fileExtension,
    fileProvider
  } = props;
  return (
    <div className="flex flex-col">
      <div className="w-52 aspect-square rounded-2xl overflow-hidden mb-2">
        <UnificationImage
          image={image}
          fileExtension={fileExtension as string}
          fileProvider={fileProvider}
        />
      </div>

      <span className="font-rounded font-normal text-black/80">
        {community.contractName} #{tokenId}
      </span>
      {amountInCrypto && (
        <span className="font-rounded font-semibold my-1">
          {Number(amountInCrypto).toFixed(3)} {saleCryptoSymbol}
        </span>
      )}
      <span className="font-rounded font-normal text-sm text-black/60 ">
        {community.contractName}
      </span>
    </div>
  );
}
