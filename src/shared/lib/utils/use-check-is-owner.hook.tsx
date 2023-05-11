import { useAccount } from "wagmi";

import type { IAddress } from "../types";

export const useCheckIsOwner = (address: IAddress) => {
  const { isConnected, address: connectedAddress } = useAccount();
  console.log(
    address.toLowerCase(),
    connectedAddress?.toString().toLowerCase()
  );

  if (!isConnected) return false;

  return address.toLowerCase() === connectedAddress?.toString().toLowerCase();
};
