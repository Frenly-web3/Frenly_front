import { useAppDispatch } from "@app/store";
import { frenGraphApi } from "@shared/api";
import { FREN_PROFILE, IAddress } from "@shared/lib";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { polygonMumbai } from "viem/chains";
import { mainnet, useContractWrite, useNetwork, useSwitchNetwork } from "wagmi";

export const useEditProfile = () => {
  const [descriptionLoading, setDescriptionLoading] = useState(false);

  const dispatch = useAppDispatch();

  const invalidateUsernameInfo = () => {
    setTimeout(() => {
      dispatch(frenGraphApi.util.invalidateTags(["USERNAME-FREN-INFO"]));
    }, 10000);
  };

  const [linkLoading, setLinkLoading] = useState(false);
  const { writeAsync } = useContractWrite({
    abi: FREN_PROFILE,
    address: process.env.NEXT_PUBLIC_USERNAME_FREN_ADDRESS as IAddress,
    chainId: polygonMumbai.id,
    functionName: "setDescription",
    onSuccess: async () => {
      invalidateUsernameInfo();
      if (chain?.id !== mainnet.id) {
        await switchNetworkAsync?.(mainnet?.id as number);
      }
    },
  });
  const { writeAsync: addBio } = useContractWrite({
    abi: FREN_PROFILE,
    address: process.env.NEXT_PUBLIC_USERNAME_FREN_ADDRESS as IAddress,
    chainId: polygonMumbai.id,
    functionName: "setBio",
    onSuccess: async () => {
      if (chain?.id !== mainnet.id) {
        await switchNetworkAsync?.(mainnet?.id as number);
        invalidateUsernameInfo();
      }
    },
  });

  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();

  const addLink = useCallback(
    async ({
      type,
      value,
      username,
    }: {
      type: string;
      value: string;
      username: string;
    }) => {
      try {
        setLinkLoading(true);

        if (chain?.id !== polygonMumbai.id) {
          await switchNetworkAsync?.(polygonMumbai?.id as number);
        }

        // if (!addLink) return;
        // await changeTwitter({ args: [{ name: type, value }] });
        await addBio({ args: [{ key: type, username, value }] });
      } catch (e: any) {
        toast.error(e.message);
      } finally {
        setLinkLoading(false);
        await switchNetworkAsync?.(mainnet?.id as number);
      }
    },
    []
  );

  const deleteLink = useCallback(
    async ({ type, username }: { type: string; username: string }) => {
      try {
        setLinkLoading(true);

        if (chain?.id !== polygonMumbai.id) {
          await switchNetworkAsync?.(polygonMumbai?.id as number);
        }

        // if (!addLink) return;
        // await changeTwitter({ args: [{ name: type, value }] });
        await addBio({ args: [{ key: type, username, value: "" }] });

        invalidateUsernameInfo();
      } catch (e: any) {
        toast.error(e.message);
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
  return {
    descriptionLoading,
    linkLoading,
    changeDescription,
    addLink,
    deleteLink,
  };
};
