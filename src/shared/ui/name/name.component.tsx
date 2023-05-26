import type { IAddress, UsernameTypeEnum } from "@shared/lib";
import { useUserName } from "@shared/lib";
import React from "react";

interface INameProperties {
  address: IAddress;
  className?: string;
  content?: string;
  usernameType?: UsernameTypeEnum;
}

export const Name = (props: INameProperties) => {
  const { address, className, content, usernameType } = props;

  const { data, isLoading } = useUserName({
    address,
    with0x: true,
    usernameType,
  });

  return (
    <div className={`flex ${className} ${isLoading && ``}`}>
      {data} {content ?? ""}
    </div>
  );
};
