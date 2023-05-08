import { clsx } from "@mantine/core";
import { IAddress, UsernameTypeEnum, useUserAvatar } from "@shared/lib";
import React from "react";

interface IProperties {
  address: IAddress;
  className?: string;
  width?: number;
  usernameType?: UsernameTypeEnum;
}

export const Avatar = (props: IProperties) => {
  const { address, className, width, usernameType } = props;

  const [mount, setMount] = React.useState(false);
  React.useEffect(() => setMount(true), []);

  const { data, isLoading } = useUserAvatar({ address, usernameType });

  if (!mount) return <div className={`${className}`} />;

  return (
    <div
      className={`${className} ${
        isLoading && `animate-pulse`
      } rounded-full aspect-square w-[${width}]`}
    >
      {/* {data && ( */}
      <img
        className={clsx("rounded-full cover", className)}
        src={data}
        alt="avatar"
      />
      {/* )} */}
    </div>
  );
};
