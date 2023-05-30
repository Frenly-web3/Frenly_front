import { IUserENS } from "./user.entity";
import { IAddress } from "@shared/lib";
import { useEffect, useMemo, useState } from "react";
import { ENS } from "@ensdomains/ensjs";
import { mainnet } from "wagmi";
import { JsonRpcProvider } from "@ethersproject/providers";

export type ProfileENSType = ReturnType<ENS["getProfile"]>;

export const useEnsInfo = ({ address }: { address: IAddress }) => {
  // const {  } = usePublicClient({ chainId: mainnet.id });
  // const [ENSInstance, setENSInstance] = useState(new ENS());
  const [profile, setProfile] = useState<Awaited<ProfileENSType>>();


  useEffect(() => {
    const provider = new JsonRpcProvider({
      url: mainnet.rpcUrls.default.http[0],

    });
    const defineProfile = async () => {
      const ENSInstance = new ENS();
      const profileInst = await ENSInstance.withProvider(provider).getProfile(
        address
      );

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
