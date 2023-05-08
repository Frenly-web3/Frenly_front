import { useContractRead } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { FREN_PROFILE } from "../constants";
import { IAddress } from "../types";

interface IuseGetFrenProfile {
  skip?: boolean;
  address: IAddress;
}

export const useGetFrenProfile = ({
  skip = false,
  address,
}: IuseGetFrenProfile) => {
  // if (skip)
  //   return {} as ReturnType<
  //     typeof useContractRead<typeof FREN_PROFILE, "getProfileByAddress">
  //   >;
  const data = useContractRead({
    abi: FREN_PROFILE,
    address: process.env.NEXT_PUBLIC_USERNAME_FREN_ADDRESS as IAddress,
    functionName: "getProfileByAddress",
    args: [address],
    chainId: polygonMumbai.id,
  });

  return data;
};
