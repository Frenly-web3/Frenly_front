import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IAddress } from "@shared/lib";

const baseQuery = fetchBaseQuery({
  baseUrl: `https://api.opensea.io/api/v1/`,
  prepareHeaders: (headers) => {
    headers.set(
      "X-API-KEY",
      process.env.NEXT_PUBLIC_NODE_OPENSEA_API_KEY as string
    );
  },
});

export const openseaApi = createApi({
  reducerPath: "openseaApi",
  baseQuery,
  endpoints: (builder) => ({
    getCollectionByAddress: builder.query({
      query: ({ contractAddress }: { contractAddress: IAddress }) => {
        return {
          url: `asset_contract/${contractAddress}`,
          method: "GET",
          redirect: "follow",
          credentials: "omit",
        };
      },
    }),
    getCollectionsForUser: builder.query({
      query: ({ address, skip }: { address: IAddress; skip?: string }) => {
        return {
          url: `collections`,
          method: "GET",
          redirect: "follow",
          credentials: "omit",
          params: {
            asset_owner: address,
            limit: 10,
            offset: 0,
          },
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs: { address, skip } }) => {
        return { endpointName, address };
      },
      merge: (currentCache, newItems, { arg: { skip } }) => {
        if (skip === "") return newItems;
        if (currentCache?.pageKey) {
          currentCache?.contracts.push(...newItems?.contracts);
          currentCache.pageKey = newItems?.pageKey;
        }

        return currentCache;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.address !== previousArg?.address ||
          currentArg?.skip !== previousArg?.skip
        );
      },
    }),
  }),
});
