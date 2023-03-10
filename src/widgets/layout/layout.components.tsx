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

  const { data: unreadNotifications } =
    notificationsApi.useGetUnreadCountQuery();

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
    <div className="bg-background min-h-screen md:flex justify-center">
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

      <div className="flex flex-col">
        <div className={`flex justify-between p-4 pb-3 bg-background`}>
          <h1 className={`font-rounded font-bold text-4xl`}>{title}</h1>
        </div>
        <ScrollToTop />
        {children}
      </div>
      {/* <RoutesBar>
        {addressHydration && <SmallUserCard address={addressHydration as IAddress} />}
      </RoutesBar> */}
      <div className="">{rightSidebar}</div>
    </div>
  );
});
