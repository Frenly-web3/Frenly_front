import { clsx, Tabs, TabsValue } from "@mantine/core";
import { IAddress } from "@shared/lib";
import * as React from "react";
import { ProfilePostList } from "./profile-post-list.component";
import { ProfileTokens } from "./profile-tokens.component";

export interface IProfileTabsProps {
  address: IAddress;
}

export function ProfileTabs(props: IProfileTabsProps) {
  const { address } = props;

  const [activeTab, setActiveTab] = React.useState<TabsValue>("activity");

  return (
    <div className="">
      <Tabs
        className="border-b-none m-auto"
        unstyled
        classNames={{
          root: "border-b-none md:ml-4",
          tabsList: "flex justify-center my-4",
          tab: "rounded-2xl border-none px-4 py-2",
          tabLabel: "font-rounded font-semibold flex items-center gap-1",
        }}
        value={activeTab}
        onTabChange={setActiveTab}
      >
        <Tabs.List>
          <Tabs.Tab
            value="activity"
            className={clsx({
              "bg-white text-black": activeTab === "activity",
              "text-black/40": activeTab !== "activity",
            })}
          >
            <span className="font-icon">auto_awesome</span> activity
          </Tabs.Tab>
          <Tabs.Tab
            value="tokens"
            className={clsx({
              "bg-white text-black": activeTab === "tokens",
              "text-black/40": activeTab !== "tokens",
            })}
          >
            <span className="font-icon">toll</span> tokens
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="activity">
          <ProfilePostList address={address} />
        </Tabs.Panel>
        <Tabs.Panel value="tokens">
          <ProfileTokens address={address}/>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
