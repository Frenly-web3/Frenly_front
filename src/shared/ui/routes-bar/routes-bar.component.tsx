import { clsx } from "@mantine/core";
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
    
      <Paper className="md:rounded-[2rem] justify-between md:w-60 max-md:w-full flex md:flex-col">
        {ROUTES.map((route, index) => {
          return (
            <Link
              className={clsx(
                "flex font-rounded max-md:relative max-md:w-fit w-full rounded-full text-base items-center p-2 font-semibold mr-2 md:hover:bg-black/5",
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
                <div className="absolute right-8 max-md:hidden rounded-full px-[6px] flex justify-items-start  ml-2 bg-main">
                  <span className="text-white font-rounded font-semibold text-xs">
                    new
                  </span>
                </div>
              )}
              {unreadBadge && route.unreadContent ? (
                <div className="absolute md:right-8 max-md:top-3 max-md:right-3 rounded-full text-white font-rounded font-semibold text-micro max-md:text-xmicro w-5 max-md:w-3 flex items-center justify-center aspect-square ml-2 bg-main">
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
    
  );
}
