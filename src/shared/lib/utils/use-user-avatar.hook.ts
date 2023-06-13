import { IAddress, UsernameTypeEnum } from "@shared/lib";
import { useEnsAvatar, useEnsName } from "wagmi";
import { mainnet } from "wagmi/chains";
import { useMemo } from "react";
import { frenGraphApi } from "@shared/api";
interface IProperties {
  address: IAddress;
  usernameType?: UsernameTypeEnum;
}
export const useUserAvatar = (props: IProperties) => {
  const { address, usernameType = UsernameTypeEnum.ETH } = props;

  const placeholder = "/assets/images/default-avatar.png";
  const { data: name } = useEnsName({ address });
  const { data: ensData, isLoading: ensLoading } = useEnsAvatar({
    name,
    chainId: mainnet.id,
  });

  const { data: usernameFrenData, isLoading: frenLoading } =
    frenGraphApi.useGetFrenUsernameInfoQuery(
      {
        address,
      },
      { skip: usernameType === UsernameTypeEnum.ETH }
    );

  const data = useMemo(() => {
    switch (usernameType) {
      case UsernameTypeEnum.FRENLY: {
        if (!usernameFrenData)
          return ensData && ensData != null ? ensData : placeholder;
        return usernameFrenData?.avatar &&
          (usernameFrenData?.avatar?.length as number) > 5
          ? usernameFrenData?.avatar
          : placeholder;
      }
      default:
        return ensData && ensData != null ? ensData : placeholder;
    }
  }, [usernameFrenData, ensData, usernameType]);

  const isLoading = ensLoading || frenLoading;

  return { data, isLoading };
};
