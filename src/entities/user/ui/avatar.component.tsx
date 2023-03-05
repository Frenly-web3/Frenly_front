import { clsx } from "@mantine/core";
import type { IAddress } from "@shared/lib";
import React from "react";

import { useUserAvatar } from "../model/use-user-avatar.hook";

interface IProperties {
  address: IAddress;
  className?: string;
  width?: number;
}

export const Avatar = (props: IProperties) => {
  const { address, className, width } = props;

  const [mount, setMount] = React.useState(false);
  React.useEffect(() => setMount(true), []);

  const { data, isLoading } = useUserAvatar({ address });

  if (!mount) return <div className={`${className}`} />;

  return (
    <div
      className={`${className} ${
        isLoading && `animate-pulse`
      } rounded-full aspect-square w-[${width}]`}
    >
      {data && (
        <img
          className={clsx("rounded-full cover", className)}
          src={data}
          alt="avatar"
        />
      )}
    </div>
  );
};
