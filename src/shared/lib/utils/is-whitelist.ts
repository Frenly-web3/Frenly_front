import { whitelistApi } from "@shared/api";
import type { IAddress } from "../types";
import { useCallback } from "react";

export const useIsWhitelisted = () => {
  const { data } = whitelistApi.useGetWhitelistedAddressQuery();
console.log(data);

  return useCallback(
    (checkedAddress: IAddress) => {
      console.log(checkedAddress);
      
      if (!data) return undefined;
      return data?.users
        .map(({ address }) => {
          return address.toLowerCase();
        })
        .includes(checkedAddress?.toLowerCase());
    },
    [data]
  );
};
