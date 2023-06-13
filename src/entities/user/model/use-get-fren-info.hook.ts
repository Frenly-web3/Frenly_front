import { frenGraphApi } from "@shared/api";
import { IAddress } from "@shared/lib";

import { useMemo } from "react";

export interface IuseGetFrenLinks {
  address: IAddress;
  skip?: boolean;
}

export const useGetFrenInfo = ({ address, skip = false }: IuseGetFrenLinks) => {
  const { data: fren } = frenGraphApi.useGetFrenUsernameInfoQuery(
    { address },
    { skip }
  );

  return useMemo(() => {
    return {
      name: fren?.username,
      address,
      description: fren?.description ?? "",
      socials: fren?.bios.map((bio) => {
        return Object.values(bio) as Array<string>;
      }),
    };
  }, [address, fren]);
};
