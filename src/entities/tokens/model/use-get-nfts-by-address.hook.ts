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

  const { data } = alchemyApi.useGetNftsForUserQuery({
    address,
    skip,
  });

  const [currentAddress, setCurrentAddress] = useState(address);

  useEffect(() => {
    if (currentAddress !== address) {
      setCurrentAddress(address);

      setSkip("");
    }
  }, [address]);

  const transformedTokens = useMemo(() => {
    if (
      data?.ownedNfts.filter((nft: any) => nft?.media[0]?.gateway !== "")
        .length < 9
    ) {
      setSkip(data?.pageKey);
    }

    return data?.ownedNfts
      .filter((nft: any) => nft?.media[0]?.gateway !== "")
      .map((nft: any): IToken => {
        return {
          format: nft?.media[0]?.format,
          imageUrl:
            nft?.media[0]?.gateway ??
            nft?.tokenUri?.gateway ??
            nft?.tokenUri?.raw,
          id: nft?.id?.tokenId,
        };
      });
  }, [data]);

  return useMemo(
    () => ({
      loadMore: () => setSkip(data?.pageKey),
      hasMore: !!data?.pageKey,
      tokens: transformedTokens,
    }),
    [address, data]
  );
};
