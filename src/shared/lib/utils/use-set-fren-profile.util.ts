import { useContractWrite } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { FREN_PROFILE } from "../constants";
import { IAddress } from "../types";

export const useSetFrenProfile = () => {
  const data = useContractWrite({
    mode: "prepared",
    abi: FREN_PROFILE,
    address: process.env.NEXT_PUBLIC_USERNAME_FREN_ADDRESS as IAddress,
    chainId: polygonMumbai.id,
  });

  return data;
};
