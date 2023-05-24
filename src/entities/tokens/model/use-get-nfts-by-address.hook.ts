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
  contractAddress,
}: {
  address: IAddress;
  contractAddress: IAddress;
}): IuseGetNftByAddressResponse => {
  const [skip, setSkip] = useState("");

  const { data } = alchemyApi.useGetNftsForUserQuery({
    address,
    skip,
    contractAddress,
  });

  const [currentAddress, setCurrentAddress] = useState(address);
  console.log(data);

  useEffect(() => {
    if (currentAddress !== address) {
      setCurrentAddress(address);

      setSkip("");
    }
  }, [address, contractAddress]);

  const transformedTokens = useMemo(() => {
    // if (
    //   data?.ownedNfts.filter((nft: any) => !nft?.image?.cachedUrl).length < 9
    // ) {
    //   setSkip(data?.pageKey);
    // }

    return data?.ownedNfts
      // .filter((nft: any) => !nft?.image?.cachedUrl)
      .map((nft: any): IToken => {
        return {
          format: nft?.image?.contentType,
          imageUrl: nft?.image?.cachedUrl,
          id: nft?.tokenId,
          name: nft?.name ?? "untitled",
          price: nft?.contract?.openSeaMetadata?.floorPrice,
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
