import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_NODE_ETH_API_KEY}/getNFTs`,
})

export const alchemyApi = createApi({
  reducerPath: 'alchemyApi',
  baseQuery,
  endpoints: (builder) => ({
    getNftsForUser: builder.query({
      query: ({ address }: { address: string }) => {
        return {
          url: `?owner=${address}`,
          method: 'GET',
          redirect: 'follow',
          credentials: 'omit',
        }
      },
    }),
  }),
})
