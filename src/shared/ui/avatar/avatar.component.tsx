import { clsx } from "@mantine/core";
import {
  IAddress,
  ImageProviderEnum,
  UsernameTypeEnum,
  useUserAvatar,
} from "@shared/lib";
import React from "react";
import { UnificationImage } from "../unification-image";

export interface IAvatarProperties {
  address: IAddress;
  className?: string;
  width?: number;
  usernameType?: UsernameTypeEnum;
}

export const Avatar = (props: IAvatarProperties) => {
  const { address, className, usernameType } = props;

  const [mount, setMount] = React.useState(false);
  React.useEffect(() => setMount(true), []);

  const { data, isLoading } = useUserAvatar({ address, usernameType });

  if (!mount) return <div className={`${className}`} />;

  return (
    <div
      className={`${className} ${
        isLoading && `animate-pulse`
      } rounded-full aspect-square`}
    >
      {/* {data && ( */}
      <UnificationImage
        className={clsx(`rounded-full cover overflow-hidden h-full`, className)}
        image={data}
        fileExtension={""}
        fileProvider={ImageProviderEnum.RARIBLE}
      />
      {/* )} */}
    </div>
  );
};
