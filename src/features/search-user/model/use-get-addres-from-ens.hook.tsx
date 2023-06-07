import { useDebouncedValue } from "@mantine/hooks";
import { frenGraphApi, usernameApi } from "@shared/api";
import type { IAddress } from "@shared/lib";
import { useEffect, useMemo, useState } from "react";

export const useGetAddressFrom = ({ value }: { value: IAddress | string }) => {
  const [debouncedValue] = useDebouncedValue(value, 200);
  const [takeCount, setTakeCount] = useState(0);

  const { data: usernamesData, isLoading } =
    usernameApi.useGetENSUsernamesQuery(
      { usernamePart: debouncedValue, skip: takeCount * 15 },
      { skip: !value }
    );

  const { data: usernamesFren, isLoading: frenLoading } =
    frenGraphApi.useGetFrenUsernamesQuery(
      { usernamePart: debouncedValue, skip: takeCount * 15 },
      { skip: !value }
    );

  console.log("FREN", usernamesFren);

  useEffect(() => {
    setTakeCount(0);
  }, [value]);

  return useMemo(() => {
    return {
      usernames: usernamesData?.usernames,
      frens: usernamesFren?.usernames,
      isLoading,
      hasMore: usernamesData?.hasMore as boolean,
      loadMore: () => setTakeCount((prev) => prev + 1),
    };
  }, [usernamesData, value, isLoading]);
};
