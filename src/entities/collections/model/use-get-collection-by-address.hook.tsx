import { openseaApi } from "@shared/api";
import { IAddress } from "@shared/lib";
import { useMemo } from "react";
import { ICollectionInfo } from "./collection.entity";

export const useGetCollectionByAddress = ({
  address,
}: {
  address: IAddress;
}) => {

  
  const { data: openseaCollection } = openseaApi.useGetCollectionByAddressQuery(
    { contractAddress: address }
  );

  return useMemo(
    (): ICollectionInfo => ({
      address: openseaCollection?.address,
      imageUrl: openseaCollection?.image_url ?? "avatar_placeholder",
      name: openseaCollection?.collection?.name ?? "unknown collection",
      description: openseaCollection?.description ?? "unknown collection",
    }),
    [openseaCollection, address]
  );
};
