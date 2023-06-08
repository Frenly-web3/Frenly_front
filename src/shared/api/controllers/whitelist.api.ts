import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IWhitelistedUsersDto } from "../dto/whitelist.dto";

const baseQuery = fetchBaseQuery({
  baseUrl: `https://script.google.com/macros/s/AKfycbyTtaVSduRJO090h_dMe-q9D77UmNk_dfztt1LDgDwMX-XuR_j0Yh4EhmdLJfmlUGnxPw/exec`,
});

export const whitelistApi = createApi({
  reducerPath: "whitelistApi",
  baseQuery,
  tagTypes: ["WHITELIST"],
  endpoints: (builder) => ({
    getWhitelistedAddress: builder.query<IWhitelistedUsersDto, void>({
      query: () => {
        return {
          url: ``,
          method: "GET",
          redirect: "follow",
          credentials: "omit",
        };
      },
      providesTags: ["WHITELIST"],
    }),
  }),
});
