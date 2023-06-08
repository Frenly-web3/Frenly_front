import { Select } from "@mantine/core";
import { userApi } from "@shared/api";
import {
  IAddress,
  UsernameTypeEnum,
  useCheckFrenProfile,
  useCheckIsOwner,
} from "@shared/lib";
import { Avatar, Name } from "@shared/ui";
import React, { useEffect, useState } from "react";

interface IInfoUploadProperties {
  address: IAddress;
  name?: string;
  description?: string;
  children?: React.ReactNode;
  usernameType?: UsernameTypeEnum;
}

export const InfoUploadComponent = (props: IInfoUploadProperties) => {
  const { address, children, usernameType } = props;
  const isOwner = useCheckIsOwner(address);
  const [currentUsernameType, setCurrentUsernameType] =
    useState<UsernameTypeEnum>();
  const isHaveFrenUsername = useCheckFrenProfile({ address });
  const [changeUsernameType] = userApi.useChangeUsernameTypeMutation();

  // const nameButtonHandler = async () => {
  //   setOpenedPopover(true);
  //   await navigator.clipboard.writeText(address);
  //   setTimeout(() => {
  //     setOpenedPopover(false);
  //   }, 2500);
  // };

  
  useEffect(() => {
    setCurrentUsernameType(usernameType as UsernameTypeEnum);
  }, [usernameType]);

  const typeNameSelectHandler = async (usernameType: string) => {
    const userType =
      usernameType === ".eth" ? UsernameTypeEnum.ETH : UsernameTypeEnum.FRENLY;
    setCurrentUsernameType(userType);
    await changeUsernameType({ usernameType: userType }).unwrap();
  };

  return (
    <div className="flex gap-8 max-md:flex-col md:items-start max-md:items-center max-md:w-full">
      <Avatar
        width={96}
        className="w-24 aspect-square"
        address={address}
        usernameType={usernameType}
      />

      <div className="flex flex-col gap-y-5 max-md:w-full">
        <div className="flex max-md:flex-col gap-2 max-md:items-center relative">
          <Name
            address={address}
            usernameType={usernameType}
            className="text-2xl font-bold font-rounded"
          />
          {isHaveFrenUsername && isOwner && (
            <Select
              classNames={{
                input: "border-none bg-[#00000000]",
                root: "absolute top-0 right-0 w-full",
              }}
              defaultChecked
              value={
                currentUsernameType === UsernameTypeEnum.ETH ||
                currentUsernameType === null
                  ? ".eth"
                  : ".fren"
              }
              data={[
                { value: ".eth", usernameType: UsernameTypeEnum.ETH },
                { value: ".fren", usernameType: UsernameTypeEnum.FRENLY },
              ]}
              onChange={typeNameSelectHandler}
            />
          )}
        </div>
        <div className="w-full">{children && children}</div>
      </div>
    </div>
  );
};
