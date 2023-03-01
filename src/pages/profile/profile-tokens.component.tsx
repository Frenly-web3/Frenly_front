import { TokensPaper } from "@entities/tokens";
import * as React from "react";

export interface IProfileTokensProps {}

export function ProfileTokens(props: IProfileTokensProps) {
  return (
    <div>
      <TokensPaper title="NFT gallery" maxRows={2} className="mb-4" />
      <TokensPaper title="POAPs & SBTs" maxRows={1} className="max-md:mb-14"/>
    </div>
  );
}
