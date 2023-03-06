import { Badge as MantineBadge, BadgeProps, clsx } from "@mantine/core";
import { useHover, useMediaQuery } from "@mantine/hooks";
import * as React from "react";

export interface IBadgeProps extends BadgeProps {
  withIcon?: boolean;
}

export function Badge(props: IBadgeProps) {
  const { children, withIcon = false, ...restProps } = props;
  const { hovered, ref } = useHover();
  const matches = useMediaQuery("(min-width: 768px)");
  return (
    <MantineBadge
      unstyled
      ref={ref}
      {...restProps}
      classNames={{ inner: "flex items-center" }}
      className={clsx(
        "z-20 rounded-full bg-black/40 px-3 py-1 text-sm font-medium backdrop-blur-sm text-white",
        {
          "md:px-1 ease-in-out duration-500":
            !matches || (!hovered && withIcon),
          "ease-in-out duration-500": !matches || (hovered && withIcon),
          "px-3 py-1": matches,
        },
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
      {(!matches || (hovered && withIcon) || !withIcon) && (
        <div
          className={clsx({
            "ml-2": !matches || (matches && hovered && withIcon),
          })}
        >
          {children}
        </div>
      )}
    </MantineBadge>
  );
}
