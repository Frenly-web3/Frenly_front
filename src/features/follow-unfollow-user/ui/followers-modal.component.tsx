import { Author } from "@entities/user";
import { clsx, Tabs, TabsValue } from "@mantine/core";
import { IUserWalletDto, userApi } from "@shared/api";
import { IAddress } from "@shared/lib";
import { AdaptiveModal } from "@shared/ui";
import * as React from "react";
import { SubscriptionStateEnum } from "../model";
import { FollowUserCard } from "./follow-user-card.component";

export interface IFollowersModalProps {
  creator: IUserWalletDto;
  opened: boolean;
  onClose: () => void;
  initialTab: SubscriptionStateEnum;
}

export function FollowersModal(props: IFollowersModalProps) {
  const { creator, onClose, opened, initialTab } = props;

  const [currentTab, setCurrentTab] = React.useState<TabsValue>(initialTab);

  const { data: followers } = userApi.useGetUserFollowersQuery({
    address: creator?.walletAddress as IAddress,
  });
  const { data: subscriptions } = userApi.useGetUserSubscriptionsQuery({
    address: creator?.walletAddress as IAddress,
  });

  React.useEffect(() => {
    onClose();
  }, [creator.walletAddress]);

  React.useEffect(() => {
    setCurrentTab(initialTab);
  }, [opened, initialTab]);

  return (
    <>
      <Tabs
        defaultValue={initialTab}
        value={currentTab}
        onTabChange={(e) => {
          setCurrentTab(e);
        }}
        classNames={{
          tabsList: "w-full px-4 py-2 flex justify-between",
          tab: "w-1/2 border-none rounded-full font-rounded font-semibold hover:",
        }}
      >
        <AdaptiveModal
          title={
            <div className="flex flex-col">
              <div className="px-4">
                <Author
                  classNames={{ avatar: "w-6 aspect-square", root: "mt-2" }}
                  postOwner={creator}
                />
              </div>
              <Tabs.List>
                <Tabs.Tab
                  value={SubscriptionStateEnum.followers}
                  className={clsx({
                    "bg-black/5":
                      currentTab === SubscriptionStateEnum.followers,
                  })}
                >
                  {SubscriptionStateEnum.followers}
                </Tabs.Tab>
                <Tabs.Tab
                  value={SubscriptionStateEnum.following}
                  className={clsx({
                    "bg-black/5":
                      currentTab === SubscriptionStateEnum.following,
                  })}
                >
                  {SubscriptionStateEnum.following}
                </Tabs.Tab>
              </Tabs.List>
            </div>
          }
          opened={opened}
          onClose={onClose}
          classNamesDrawer={{
            header: "p-0 m-0",
            title: "w-full m-0",
            closeButton: "absolute right-2 top-2",
            body: "px-4 py-2 overflow-scroll h-56",
          }}
          classNamesModal={{
            // modal: 'h-96',
            header: "p-0 m-0",
            title: "w-full m-0",
            close: "absolute right-2 top-2",
            body: "px-4 py-2 overflow-y-auto h-64",
          }}
        >
          <Tabs.Panel value={SubscriptionStateEnum.followers}>
            {followers?.map((follower, index) => {
              return <FollowUserCard creator={follower as unknown as IUserWalletDto} key={index} />;
            })}
          </Tabs.Panel>

          <Tabs.Panel value={SubscriptionStateEnum.following}>
            {subscriptions?.map((follower, index) => {
              return <FollowUserCard creator={follower as unknown as IUserWalletDto} key={index} />;
            })}
          </Tabs.Panel>
        </AdaptiveModal>
      </Tabs>
    </>
  );
}
