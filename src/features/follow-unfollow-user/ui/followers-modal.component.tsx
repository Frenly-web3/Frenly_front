import { SmallUserCard } from "@entities/user";
import { clsx, Tabs, TabsValue } from "@mantine/core";
import { userApi } from "@shared/api";
import { IAddress } from "@shared/lib";
import { AdaptiveModal } from "@shared/ui";
import * as React from "react";
import { FollowUserCard } from "./follow-user-card.component";

export interface IFollowersModalProps {
  address: IAddress;
  opened: boolean;
  onClose: () => void;
}

export function FollowersModal(props: IFollowersModalProps) {
  const { address, onClose, opened } = props;

  const [currentTab, setCurrentTab] = React.useState<TabsValue>("followers");

  const { data: followers } = userApi.useGetUserFollowersQuery({
    address: address as IAddress,
  });
  const { data: subscriptions } = userApi.useGetUserSubscriptionsQuery({
    address: address as IAddress,
  });

  return (
    <>
      <Tabs
        defaultValue="followers"
        onTabChange={(e) => {
          setCurrentTab(e);
        }}
        classNames={{
          tabsList: "w-full px-4  py-2 flex justify-between",
          tab: "w-1/2 border-none rounded-full font-rounded font-semibold hover",
        }}
      >
        <AdaptiveModal
          title={
            <div className="flex flex-col">
              <div className="px-4">
                <SmallUserCard address={address} />
              </div>
              <Tabs.List>
                <Tabs.Tab
                  value="followers"
                  className={clsx({ "bg-black/5": currentTab === "followers" })}
                >
                  followers
                </Tabs.Tab>
                <Tabs.Tab
                  value="following"
                  className={clsx({ "bg-black/5": currentTab === "following" })}
                >
                  following
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
            body: "px-4 py-2 overflow-scroll h-36",
          }}
        >
          <Tabs.Panel value="followers">
            {followers?.map((follower, index) => {
              return <FollowUserCard address={follower} key={index} />;
            })}
          </Tabs.Panel>

          <Tabs.Panel value="following">
            {subscriptions?.map((follower, index) => {
              return <FollowUserCard address={follower} key={index} />;
            })}
          </Tabs.Panel>
        </AdaptiveModal>
      </Tabs>
    </>
  );
}
