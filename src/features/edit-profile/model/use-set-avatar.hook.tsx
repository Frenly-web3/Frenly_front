import { FREN_PROFILE, IAddress, useUploadIpfs } from "@shared/lib";
import { ChangeEventHandler, useState } from "react";
import { mainnet, useContractWrite, useNetwork, useSwitchNetwork } from "wagmi";
import { polygon } from "wagmi/chains";

export const useSetAvatar = () => {
  const { upload } = useUploadIpfs();
  const [isLoading, setIsLoading] = useState(false);
  const [_, setLink] = useState<string>("");
  const { writeAsync } = useContractWrite({
    abi: FREN_PROFILE,
    address: process.env.NEXT_PUBLIC_USERNAME_FREN_ADDRESS as IAddress,
    chainId: polygon.id,
    functionName: "changeAvatar",
    onSuccess: async () => {
      if (chain?.id !== mainnet.id) {
        await switchNetworkAsync?.(mainnet?.id as number);
      }
    },
  });

  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();

  const setAvatar: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      setIsLoading(true);
      const link = await upload(e?.target.files?.[0] as File);

      setLink(link);
      if (chain?.id !== polygon.id) {
        await switchNetworkAsync?.(polygon?.id as number);
      }

      if (!writeAsync) return;
      await writeAsync({ args: [link] });
    } catch {
    } finally {
      setIsLoading(false);
      await switchNetworkAsync?.(mainnet?.id as number);
    }
  };

  return { setAvatar, isLoading };
};
