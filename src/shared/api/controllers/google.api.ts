import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IAddress } from "@shared/lib";

const baseQuery = fetchBaseQuery({
  baseUrl: `https://script.google.com/macros/s/AKfycbwNPTAFoUd93O4G3LKUq-MpNxyUZfsINY9evwVRL7rgVCJHQED0tJ8Fh-VRutlQh6G1/exec`,
});

export const googleApi = createApi({
  reducerPath: "googleApi",
  baseQuery,
  endpoints: (builder) => ({
    sendUsernameInfo: builder.mutation({
      query: ({
        address,
        username,
      }: {
        address: IAddress;
        username: string;
      }) => {
        const data = new FormData();
        data.append("address", address);
        data.append("username", username);
        return {
          url: ``,
          method: "POST",
          redirect: "follow",
          credentials: "omit",
          body: data,
        };
      },
    }),
  }),
});
