import { useMemo, useState } from "react";
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

  const { data } = alchemyApi.useGetNftsForUserQuery({ address, skip });

  return useMemo(
    () => ({
      loadMore: () => setSkip(data?.pageKey),
      hasMore: !!data?.pageKey,
      tokens: data?.ownedNfts.map((nft: any): IToken => {
        return {
          imageUrl: nft?.media[0]?.gateway ?? nft?.tokenUri?.gateway ?? nft?.tokenUri?.raw,
          id: nft?.id?.tokenId,
        };
      }),
    }),
    [address, data]
  );
};
