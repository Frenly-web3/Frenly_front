import { FREN_PROFILE, IAddress, useUploadIpfs } from "@shared/lib";
import { ChangeEventHandler, useState } from "react";
import { useContractWrite, useNetwork, useSwitchNetwork } from "wagmi";
import { polygonMumbai } from "wagmi/chains";

export const useSetAvatar = () => {
  const { upload } = useUploadIpfs();
  const [isLoading, setIsLoading] = useState(false);
  const [link, setLink] = useState<string>("");
  const { writeAsync } = useContractWrite({
    abi: FREN_PROFILE,
    address: process.env.NEXT_PUBLIC_USERNAME_FREN_ADDRESS as IAddress,
    chainId: polygonMumbai.id,
    functionName: "changeAvatar",
  });

  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork({
    onSuccess: async () => {
      console.log("SSSSSSSS");

      // if (!writeAsync) return;
      await writeAsync?.({ args: [link] });
    },
  });

  const setAvatar: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      setIsLoading(true);
      const link = await upload(e?.target?.files?.[0] as File);

      setLink(link);
      if (chain?.id !== polygonMumbai.id) {
        await switchNetworkAsync?.(polygonMumbai?.id as number);
      }

      if (!writeAsync) return;
      await writeAsync({ args: [link] });
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return { setAvatar, isLoading };
};
