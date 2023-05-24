import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IAddress } from "@shared/lib";

const baseQuery = fetchBaseQuery({
  baseUrl: `https://eth-mainnet.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_NODE_ETH_API_KEY}/`,
});

export const alchemyApi = createApi({
  reducerPath: "alchemyApi",
  baseQuery,
  endpoints: (builder) => ({
    getNftsForUser: builder.query({
      query: ({
        address,
        skip,
        contractAddress,
      }: {
        address: IAddress;
        skip: string;
        contractAddress: string;
      }) => {
        return {
          url: `getNFTsForOwner?excludeFilters[]=SPAM&contractAddresses[]=${contractAddress}`,
          method: "GET",
          redirect: "follow",
          credentials: "omit",
          params: {
            owner: address,
            spamConfidenceLevel: "LOW",
            withMetadata: true,
            tokenUriTimeoutInMs: "0",
            pageSize: 12,
            pageKey: skip,
          },
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs: { address, skip } }) => {
        return { endpointName, address };
      },
      merge: (currentCache, newItems, { arg: { skip } }) => {
        if (skip === "") return newItems;
        if (currentCache?.pageKey) {
          currentCache?.ownedNfts.push(...newItems?.ownedNfts);
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
    getCollectionByAddress: builder.query({
      query: ({ contractAddress }: { contractAddress: IAddress }) => {
        return {
          url: `getContractMetadata?excludeFilters[]=SPAM`,
          method: "GET",
          redirect: "follow",
          credentials: "omit",
          params: {
            contractAddress,
          },
        };
      },
    }),
    getCollectionsForUser: builder.query({
      query: ({ address, skip }: { address: IAddress; skip?: string }) => {
        return {
          url: `getContractsForOwner?excludeFilters[]=SPAM`,
          method: "GET",
          redirect: "follow",
          credentials: "omit",
          params: {
            owner: address,
            spamConfidenceLevel: "LOW",
            withMetadata: true,
            tokenUriTimeoutInMs: "0",
            pageSize: 12,
            pageKey: skip,
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
