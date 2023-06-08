import { frenGraphApi } from "@shared/api";
import { IAddress, useGetFrenProfile } from "@shared/lib";

import { useMemo } from "react";

export interface IuseGetFrenLinks {
  address: IAddress;
  skip?: boolean;
}

export const useGetFrenInfo = ({ address, skip = false }: IuseGetFrenLinks) => {
  const { data } = useGetFrenProfile({ address, skip });
  const { data: fren } = frenGraphApi.useGetFrenUsernameInfoQuery(
    { address },
    { skip }
  );
  console.log(fren, fren?.bios.map((bio)=>{
    return Object.values(bio)
  }));
  
  return useMemo(() => {
    return {
      name: fren?.username,
      address,
      description: fren?.description ?? "",
      socials: fren?.bios.map((bio)=>{
        return Object.values(bio)
      }),
    };
  }, [address, fren]);
};
