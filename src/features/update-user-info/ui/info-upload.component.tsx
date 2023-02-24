import { Author, Avatar, Name, useEnsInfo, UserCard } from "@entities/user";
import { IAddress, useUserName } from "@shared/lib";
import { info } from "console";
import React from "react";

interface IInfoUploadProperties {
  address: IAddress;
  name?: string;
  description?: string;
  children?: React.ReactNode;
}

export const InfoUploadComponent = (props: IInfoUploadProperties) => {
  const { address, name, children, description } = props;

  const { data } = useUserName({ address });
  return (
    <div className="flex gap-8 max-md:flex-col md:items-start max-md:items-center max-md:w-full">
      
        <Avatar className="w-24 aspect-square" address={address} />

        <div className="flex flex-col gap-y-5 max-md:w-full">
          <div className="flex max-md:flex-col gap-2 max-md:items-center">
            <Name
              address={address}
              className="text-2xl font-bold font-rounded"
            />
            {name && name !== data && (
              <div className="text-2xl text-black/40">{name}</div>
            )}
          </div>
          <div className="w-full">{children && children}</div>
        </div>
        
    </div>
  );
};
