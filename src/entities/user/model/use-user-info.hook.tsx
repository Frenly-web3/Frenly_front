import { userApi } from "@shared/api";
import { IAddress, UsernameTypeEnum, useCheckFrenProfile } from "@shared/lib";
import React, { useMemo } from "react";

import type { IUser } from "./user.entity";

interface IProperties {
  address: IAddress;
}

export const useUserInfo = (props: IProperties) => {
  const { address } = props;

  const isHaveFrenUsername = useCheckFrenProfile({ address });

  const {
    data: userInfo,
    refetch: refetchUserInfo,
    isLoading,
  } = userApi.useGetUserInfoQuery({ address });

  React.useEffect(() => {
    refetchUserInfo();
  }, [refetchUserInfo]);

  const user: IUser = useMemo(
    () => ({
      id: userInfo?.id as number,
      totalFollowers: userInfo?.totalFollowers!,
      totalSubscribers: userInfo?.totalSubscribers!,
      walletAddress: address,
      usernameType: isHaveFrenUsername
        ? userInfo?.ensType
        : UsernameTypeEnum.ETH,
    }),
    [userInfo]
  );

  return {
    user,
    refetchUserInfo,
    isLoading,
  };
};
