import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

import {
  IUsernameDto,
  IUsernameRequest,
  IUsernameTransformedDto,
} from "../dto";
import { gql } from "@apollo/client";

export const usernameApi = createApi({
  reducerPath: "usernameApi",
  baseQuery: graphqlRequestBaseQuery({
    url: process.env.NEXT_PUBLIC_ENS_USERNAME_LINK as string,
  }),
  tagTypes: ["USERNAME"],
  endpoints: (builder) => ({
    getENSUsernames: builder.query<IUsernameTransformedDto, IUsernameRequest>({
      providesTags: ["USERNAME"],
      query: ({ usernamePart, skip }) => ({
        document: gql`
          query getEnsUsername($usernamePart: String, $skip: Int) {
            domains(
              first: 15
              skip: $skip
              orderBy: name
              where: { name_starts_with: $usernamePart }
            ) {
              owner {
                id
              }
              name
            }
          }
        `,
        variables: {
          usernamePart,
          skip,
        },
      }),
      serializeQueryArgs: ({
        endpointName,
        queryArgs: { skip, usernamePart },
      }) => {
        return { endpointName, usernamePart };
      },
      merge: (currentCache, newItems, { arg: { skip } }) => {
        if (skip === 0) {
          return {
            usernames: newItems.usernames,
            hasMore: newItems.usernames.length !== 0,
          };
        }

        currentCache.usernames.push(...newItems.usernames);
        currentCache.hasMore = newItems.usernames.length !== 0;
        return currentCache;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      transformResponse: (response: IUsernameDto) => {
        return {
          usernames: response.domains.map(({ name, owner }) => {
            return {
              address: owner.id,
              name,
            };
          }),
          hasMore: response.domains.length !== 0,
        };
      },
    }),
  }),
});
