import { Tooltip } from "@mantine/core";
import { IAddress, useUserName } from "@shared/lib";
import { Avatar, Name, Popover } from "@shared/ui";
import React, { useState } from "react";

interface IInfoUploadProperties {
  address: IAddress;
  name?: string;
  description?: string;
  children?: React.ReactNode;
}

export const InfoUploadComponent = (props: IInfoUploadProperties) => {
  const { address, name, children } = props;

  const { data } = useUserName({ address });

  const [openedPopover, setOpenedPopover] = useState(false);

  const nameButtonHandler = async () => {
    setOpenedPopover(true);
    await navigator.clipboard.writeText(address);
    setTimeout(() => {
      setOpenedPopover(false);
    }, 2500);
  };

  return (
    <div className="flex gap-8 max-md:flex-col md:items-start max-md:items-center max-md:w-full">
      <Avatar width={96} className="w-24 aspect-square" address={address} />

      <div className="flex flex-col gap-y-5 max-md:w-full">
        <div className="flex max-md:flex-col gap-2 max-md:items-center">
          <Popover
            withinPortal
            content="copied"
            opened={openedPopover}
            setOpened={setOpenedPopover}
          >
            <button onClick={nameButtonHandler}>
              <Name
                address={address}
                className="text-2xl font-bold font-rounded"
              />
            </button>
          </Popover>
          {name && name !== data && (
            <div className="text-2xl text-black/40">{name}</div>
          )}
        </div>
        <div className="w-full">{children && children}</div>
      </div>
    </div>
  );
};
