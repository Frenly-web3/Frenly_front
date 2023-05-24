import { useEffect, useMemo, useState } from "react";
import { alchemyApi, openseaApi } from "@shared/api";
import { IAddress } from "@shared/lib";
import { ICollection } from "./collection.entity";

export interface IuseGetCollectionsByAddressResponse {
  collections: ICollection[];
  loadMore: () => void;
  hasMore: boolean;
}

export const useGetCollectionsByAddress = ({
  address,
}: {
  address: IAddress;
}): IuseGetCollectionsByAddressResponse => {
  const [skip, setSkip] = useState<string | undefined>(undefined);
  const { data } = alchemyApi.useGetCollectionsForUserQuery({
    address,
    skip,
  });
  const { data: openseaCollections } = openseaApi.useGetCollectionsForUserQuery({
    address,
    skip,
  });

  console.log(openseaCollections);
  

  const [currentAddress, setCurrentAddress] = useState(address);

  useEffect(() => {
    if (currentAddress !== address) {
      setCurrentAddress(address);

      setSkip(undefined);
    }
  }, [address]);

  const transformedCollections = useMemo(() => {
    // if (
    //   data?.ownedNfts.filter((nft: any) => nft?.media[0]?.gateway !== "")
    //     .length < 9
    // ) {
    //   setSkip(data?.pageKey);
    // }

    return data?.contracts
      .filter(({ image }: any) => !!image.cachedUrl)
      .map(
        ({
          address,
          openSeaMetadata,
          image,
          totalBalance,
          name,
        }: any): ICollection => {
          return {
            previewFormat: image.contentType,
            address,
            imageUrl: openSeaMetadata?.imageUrl ?? "avatar_placeholder",
            name: openSeaMetadata?.collectionName ?? name ?? "untitled",
            previewUrl: image.cachedUrl ?? "",
            totalBalance: +totalBalance,
          };
        }
      );
  }, [data]);

  return useMemo(
    () => ({
      loadMore: () => setSkip(data?.pageKey),
      hasMore: !!data?.pageKey,
      collections: transformedCollections,
    }),
    [address, data]
  );
};
