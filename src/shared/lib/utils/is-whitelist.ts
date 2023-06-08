import { whitelistApi } from "@shared/api";
import type { IAddress } from "../types";
import { useCallback } from "react";

export const useIsWhitelisted = () => {
  const { data } = whitelistApi.useGetWhitelistedAddressQuery();

  return useCallback(
    (checkedAddress: IAddress) => {
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
