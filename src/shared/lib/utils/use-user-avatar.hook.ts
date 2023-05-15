import { IAddress, UsernameTypeEnum } from "@shared/lib";
import { useEnsAvatar, useEnsName } from "wagmi";
import { mainnet } from "wagmi/chains";
import { useGetFrenProfile } from "./use-get-fren-profile.util";
import { useMemo } from "react";
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
    enabled: usernameType === UsernameTypeEnum.ETH,
  });

  const { data: usernameFrenData, isLoading: frenLoading } = useGetFrenProfile({
    address,
    skip: usernameType !== UsernameTypeEnum.FRENLY,
  });

  const data = useMemo(() => {
    switch (usernameType) {
      case null:
      case UsernameTypeEnum.ETH: {
        return ensData && ensData != null ? ensData : placeholder;
      }
      case UsernameTypeEnum.FRENLY: {
        return usernameFrenData?.imageURI &&
          (usernameFrenData?.imageURI?.length as number) > 5
          ? usernameFrenData?.imageURI
          : placeholder;
      }
      default:
        return placeholder;
    }
  }, [usernameFrenData, ensData, usernameType]);

  const isLoading = ensLoading || frenLoading;

  return { data, isLoading };
};
