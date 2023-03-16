import type { IAddress } from "@shared/lib";
import { useUserName } from "@shared/lib";
import React from "react";

interface INameProperties {
  address: IAddress;
  className?: string;
  content?: string;
}

export const Name = (props: INameProperties) => {
  const { address, className, content } = props;

  const { data, isLoading } = useUserName({ address });

  return (
    <div className={`flex ${className} ${isLoading && ``}`}>
      {`${data.slice(-4) != ".eth" ? "0x" : ""}${data}`} {content ?? ""}
    </div>
  );
};
