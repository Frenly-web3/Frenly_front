import { useContractRead } from "wagmi";
import { FREN_PROFILE } from "../constants";
import { IAddress } from "../types";
import { polygonMumbai } from "viem/chains";

export const useCheckFrenProfile = ({ address }: { address: IAddress }) => {
  const { data } = useContractRead({
    abi: FREN_PROFILE,
    address: process.env.NEXT_PUBLIC_USERNAME_FREN_ADDRESS as IAddress,
    functionName: "balanceOf",
    args: [address],
    chainId: polygonMumbai.id,
  });

  return Number(data) > 0;
};
