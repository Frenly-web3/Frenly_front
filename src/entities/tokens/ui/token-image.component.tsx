import { UnificationImage } from "@shared/ui";
import * as React from "react";
import { IToken } from "../model/token.entity";

export interface ITokenImageProps extends IToken {}

export function TokenImage(props: ITokenImageProps) {
  const { imageUrl, format } = props;

  return (
    <>
      <div
        className={`w-full aspect-square rounded-2xl overflow-hidden border-2 border-black/10 `}
      >
        <UnificationImage image={imageUrl} fileExtension={format as string} />
      </div>
    </>
  );
}
