import { useEnsName } from "wagmi";

import type { IAddress } from "../types";
import { shortAddress } from "./format-short-address";
import { UsernameTypeEnum } from "../enums";
import { useMemo } from "react";
import { mainnet } from "wagmi/chains";
import { useGetFrenProfile } from "./use-get-fren-profile.util";

interface IProperties {
  address: IAddress;
  with0x?: boolean;
  usernameType?: UsernameTypeEnum | null;
}

export const useUserName = (props: IProperties) => {
  const { address, with0x, usernameType = UsernameTypeEnum.ETH } = props;
  

  const { data: ensData, isLoading: ensLoading } = useEnsName({
    address,
    chainId: mainnet.id,
    enabled: usernameType === UsernameTypeEnum.ETH,
  });
  const { data: usernameFrenData } = useGetFrenProfile({
    address,
    skip: usernameType !== UsernameTypeEnum.FRENLY,
  });


  const data = useMemo(() => {
    switch (usernameType) {
      case UsernameTypeEnum.ETH:
      case null: {
        return ensData && ensData != null
          ? ensData
          : shortAddress({ address, with0x });
      }
      case UsernameTypeEnum.FRENLY: {
        return (
          usernameFrenData?.username + ".fren" ??
          shortAddress({ address, with0x })
        );
      }
      default:
        return shortAddress({ address, with0x });
    }
  }, [usernameFrenData, ensData, usernameType]);

  return { data: data as string, isLoading: ensLoading };
};
