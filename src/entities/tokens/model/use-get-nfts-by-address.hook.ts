import { useEffect, useMemo, useState } from "react";
import { IToken } from "./token.entity";
import { alchemyApi } from "@shared/api";
import { IAddress } from "@shared/lib";

export interface IuseGetNftByAddressResponse {
  tokens: IToken[];
  loadMore: () => void;
  hasMore: boolean;
}

export const useGetNftsByAddress = ({
  address,
}: {
  address: IAddress;
}): IuseGetNftByAddressResponse => {
  const [skip, setSkip] = useState("");
  const [randomKey, setRandomKey] = useState("");

  const { data } = alchemyApi.useGetNftsForUserQuery({ address, skip, randomKey });
  const [currentAddress, setCurrentAddress] = useState(address);

  useEffect(() => {
    if (currentAddress !== address) {
      setRandomKey(`${Math.random() * 10e18}`);
    }
    setCurrentAddress(address);

    setSkip("");
  }, [address]);

  return useMemo(
    () => ({
      loadMore: () => setSkip(data?.pageKey),
      hasMore: !!data?.pageKey,
      tokens: data?.ownedNfts.map((nft: any): IToken => {
        return {
          imageUrl:
            nft?.media[0]?.gateway ??
            nft?.tokenUri?.gateway ??
            nft?.tokenUri?.raw,
          id: nft?.id?.tokenId,
        };
      }),
    }),
    [address, data]
  );
};
