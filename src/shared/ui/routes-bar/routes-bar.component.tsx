import { clsx, Image } from "@mantine/core";
import { ROUTES } from "@shared/lib";
import Link from "next/link";
import * as React from "react";

import { Paper } from "../paper";

export interface IRoutesBarProperties {
  children: React.ReactNode;
  chosedMenu: number;
  unreadBadge?: number;
}

export function RoutesBar(props: IRoutesBarProperties) {
  const { children, chosedMenu, unreadBadge } = props;

  return (
    <div className="flex flex-col h-fit items-center max-md:border max-md:border-t-2 max-md:border-white/20 max-md:left-0 z-[999] md:sticky fixed md:top-4 max-md:w-screen max-md:bottom-0">
      <div className="max-w-32 h-9 mb-9 max-md:hidden">
        <Image alt={"logo"} src={"/assets/icons/logo.svg"} />
      </div>
      <Paper className="md:rounded-[2rem] justify-between md:w-60 max-md:w-full flex md:flex-col">
        {ROUTES.map((route, index) => {
          return (
            <Link
              className={clsx(
                "flex font-rounded w-full rounded-full text-base items-center p-2 font-semibold mr-2 md:hover:bg-black/5",
                {
                  "text-black": chosedMenu == index,
                  "text-black/40": chosedMenu !== index,
                }
              )}
              key={index}
              href={route.path}
            >
              {/* <img alt={route.name} src={route.icon} className="h-4 w-4 mr-2" /> */}
              <span className="font-icon text-xl mr-2">{route.icon}</span>
              <span className="max-md:hidden font-semibold">{route.name}</span>
              {route.isNew && (
                <div className="absolute right-4 max-md:hidden rounded-full px-[6px] flex justify-items-start  ml-2 bg-main">
                  <span className="text-white font-rounded font-semibold text-xs">
                    new
                  </span>
                </div>
              )}
              {unreadBadge && route.unreadContent ? (
                <div className="absolute right-4 rounded-full text-white font-rounded font-semibold text-micro w-5 flex items-center justify-center aspect-square ml-2 bg-main">
                  {unreadBadge}
                </div>
              ) : (
                <></>
              )}
            </Link>
          );
        })}

        {children}
      </Paper>
    </div>
  );
}
