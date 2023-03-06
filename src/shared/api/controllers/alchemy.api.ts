import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IAddress } from "@shared/lib";

const baseQuery = fetchBaseQuery({
  baseUrl: `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_NODE_ETH_API_KEY}/getNFTs`,
});

export const alchemyApi = createApi({
  reducerPath: "alchemyApi",
  baseQuery,
  endpoints: (builder) => ({
    getNftsForUser: builder.query({
      query: ({ address, skip }: { address: IAddress; skip: string }) => {
        return {
          url: `?owner=${address}&pageSize=9${
            skip && `&pageKey=${skip}`
          }&excludeFilters[0]=SPAM`,
          method: "GET",
          redirect: "follow",
          credentials: "omit",
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs: { address } }) => {
        return { endpointName, address };
      },
      merge: (currentCache, newItems) => {
        currentCache?.ownedNfts.push(...newItems?.ownedNfts);
        currentCache.pageKey = newItems?.pageKey;
        return currentCache;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});
