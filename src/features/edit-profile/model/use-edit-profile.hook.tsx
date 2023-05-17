import { FREN_PROFILE, IAddress } from "@shared/lib";
import { useCallback, useState } from "react";
import { polygonMumbai } from "viem/chains";
import { mainnet, useContractWrite, useNetwork, useSwitchNetwork } from "wagmi";

export const useEditProfile = () => {
  const [descriptionLoading, setDescriptionLoading] = useState(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const { writeAsync } = useContractWrite({
    abi: FREN_PROFILE,
    address: process.env.NEXT_PUBLIC_USERNAME_FREN_ADDRESS as IAddress,
    chainId: polygonMumbai.id,
    functionName: "setDescription",
    onSuccess: async () => {
      if (chain?.id !== mainnet.id) {
        await switchNetworkAsync?.(mainnet?.id as number);
      }
    },
  });
  const { writeAsync: changeTwitter } = useContractWrite({
    abi: FREN_PROFILE,
    address: process.env.NEXT_PUBLIC_USERNAME_FREN_ADDRESS as IAddress,
    chainId: polygonMumbai.id,
    functionName: "setTwitterLink",
    onSuccess: async () => {
      if (chain?.id !== mainnet.id) {
        await switchNetworkAsync?.(mainnet?.id as number);
      }
    },
  });

  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();

  const addLink = useCallback(
    async ({ type, value }: { type: string; value: string }) => {
      try {
        setLinkLoading(true);

        if (chain?.id !== polygonMumbai.id) {
          await switchNetworkAsync?.(polygonMumbai?.id as number);
        }

        if (!writeAsync) return;
        await changeTwitter({ args: [value] });
      } catch {
      } finally {
        setLinkLoading(false);
        await switchNetworkAsync?.(mainnet?.id as number);
      }
    },
    []
  );
  const changeDescription = useCallback(
    async ({ description }: { description: string }) => {
      try {
        setDescriptionLoading(true);

        if (chain?.id !== polygonMumbai.id) {
          await switchNetworkAsync?.(polygonMumbai?.id as number);
        }

        if (!writeAsync) return;
        await writeAsync({ args: [description] });
      } catch {
      } finally {
        setDescriptionLoading(false);
        await switchNetworkAsync?.(mainnet?.id as number);
      }
    },
    []
  );
  return { descriptionLoading, linkLoading, changeDescription, addLink };
};
