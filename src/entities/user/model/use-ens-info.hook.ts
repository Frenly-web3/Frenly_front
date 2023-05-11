import { IUserENS } from "./user.entity";
import { IAddress } from "@shared/lib";
import { useEffect, useMemo, useState } from "react";
import { ENS } from "@ensdomains/ensjs";
import { mainnet, useProvider } from "wagmi";
import { JsonRpcProvider } from "@ethersproject/providers";

export type ProfileENSType = ReturnType<ENS["getProfile"]>;

export const useEnsInfo = ({ address }: { address: IAddress }) => {
  const provider = useProvider({chainId: mainnet.id});
  // const [ENSInstance, setENSInstance] = useState(new ENS());
  const [profile, setProfile] = useState<Awaited<ProfileENSType>>();

  useEffect(() => {
    const defineProfile = async () => {
      const ENSInstance = new ENS();
      const profileInst = await ENSInstance.withProvider(
        provider as JsonRpcProvider
      ).getProfile(address);

      setProfile(profileInst);
    };
    defineProfile();
  }, [address]);

  return useMemo((): IUserENS => {
    const userInfo = profile?.records?.texts?.map(({ key, value }) => {
      return [key as string, value];
    });

    const { name, description, header, avatar, ...social } = userInfo
      ? Object.fromEntries(
          userInfo as Iterable<readonly [PropertyKey, string | undefined]>
        )
      : { name: "", description: "", header: "", avatar: "" };

    return {
      name,
      description,
      header,
      avatar,
      social: Object.entries(social),
    };
  }, [profile, address]);
};
