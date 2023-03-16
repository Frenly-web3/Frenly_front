import { TokensPaper } from "@entities/tokens";
import { IAddress } from "@shared/lib";
import * as React from "react";

export interface IProfileTokensProps {
  address: IAddress;
}

export function ProfileTokens(props: IProfileTokensProps) {
  const { address } = props;
  console.log(address)
  return (
    <div className="max-md:mb-20">
      <TokensPaper
        address={address}
        title="NFT gallery"
        maxRows={2}
        className="mb-4"
      />
      {/* <TokensPaper title="POAPs & SBTs" maxRows={1} className="max-md:mb-14"/> */}
    </div>
  );
}
