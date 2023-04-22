import { Badge as MantineBadge, BadgeProps, clsx } from "@mantine/core";

import * as React from "react";

export interface IBadgeProps extends BadgeProps {
  withIcon?: boolean;
}

export function Badge(props: IBadgeProps) {
  const { children, withIcon = false, ...restProps } = props;

  return (
    <MantineBadge
      unstyled
      {...restProps}
      classNames={{ inner: "flex items-center" }}
      className={clsx(
        "z-20 rounded-full bg-black/40 px-3 py-1 text-sm font-medium backdrop-blur-sm text-white ",
        props.className
      )}
    >
      {withIcon && (
        <img
          className="w-4 aspect-square"
          src={"/assets/icons/post-info.svg"}
          alt="info"
        />
      )}
      <div className={"ml-2"}>{children}</div>
    </MantineBadge>
  );
}
