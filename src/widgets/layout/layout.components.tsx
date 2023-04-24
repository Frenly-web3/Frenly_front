import { SmallUserCard } from "@entities/user";
import { useIsomorphicEffect } from "@mantine/hooks";
import { notificationsApi } from "@shared/api";
import type { IAddress } from "@shared/lib";
import { ROUTES } from "@shared/lib";
import { Meta } from "@shared/ui";
import { RoutesBar } from "@shared/ui/routes-bar";
import { useRouter } from "next/router";
import { memo, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { ScrollToTop } from "./scroll-to-top.component";

interface IProperties {
  title: string;
  children: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

export const Layout = memo((props: IProperties) => {
  const { children, rightSidebar, title } = props;

  const { address } = useAccount();
  const [addressHydration, setAddressHydration] = useState<IAddress>();

  const { data: unreadNotifications } = notificationsApi.useGetUnreadCountQuery(
    {},
    { pollingInterval: 15000 }
  );

  const router = useRouter();

  useIsomorphicEffect(() => {
    setAddressHydration(address as IAddress);
  });

  const currentIndexMenu = useMemo(() => {
    return ROUTES.findIndex((route) => {
      return route.path === router.asPath;
    });
  }, [router.asPath]);

  return (
    <div className="bg-background min-h-screen md:flex justify-center max-xl:px-4 max-md:px-0">
      <Meta title="frenly feed" description="your frenly feed" />

      <RoutesBar
        chosedMenu={currentIndexMenu}
        unreadBadge={unreadNotifications}
      >
        {addressHydration && (
          <SmallUserCard
            chosenInMenu={currentIndexMenu === -1}
            address={addressHydration as IAddress}
            isMenu
          />
        )}
      </RoutesBar>

      <div className="flex flex-col max-lg:w-full lg:w-[37rem] md:ml-4 lg:mr-4 max-md:pb-20">
        <div
          className={`flex justify-between mb-6 mt-1 max-md:pl-4 max-md:my-3 bg-background`}
        >
          <h1 className={`font-rounded font-bold text-4xl`}>{title}</h1>
        </div>
        <ScrollToTop />
        {children}
      </div>

      <div className="">{rightSidebar ?? <div className="lg:w-60"></div>}</div>
    </div>
  );
});
