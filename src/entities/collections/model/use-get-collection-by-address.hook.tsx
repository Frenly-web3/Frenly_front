import { alchemyApi } from "@shared/api";
import { IAddress } from "@shared/lib";
import { useMemo } from "react";
import { ICollectionInfo } from "./collection.entity";

export const useGetCollectionByAddress = ({
  address,
}: {
  address: IAddress;
}) => {
  const { data } = alchemyApi.useGetCollectionByAddressQuery({
    contractAddress: address,
  });
  console.log(data);

  return useMemo(
    (): ICollectionInfo => ({
      address: data?.address,
      imageUrl: data?.openSeaMetadata?.imageUrl ?? "avatar_placeholder",
      name: data?.name ?? data?.openSeaMetadata?.collectionName ?? "unknown collection",
      description: data?.openSeaMetadata?.description ?? 'unknown collection',
    }),
    [data]
  );
};
