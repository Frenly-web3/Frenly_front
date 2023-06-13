import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { IUsernameRequest } from "../dto";
import { gql } from "@apollo/client";
import {
  IGetUsernameFrenAddressResponse,
  IUsernameFrenDto,
  IUsernameFrenInfoDto,
  IUsernameFrenInfoResponse,
  IUsernameFrenTransformedDto,
} from "../dto/fren-graph.dto";

export const frenGraphApi = createApi({
  reducerPath: "frenGraphApi",
  baseQuery: graphqlRequestBaseQuery({
    url: "https://api.studio.thegraph.com/query/47786/fren-profiles/version/latest",
  }),
  tagTypes: ["USERNAME-FREN", "USERNAME-FREN-INFO"],
  endpoints: (builder) => ({
    getFrenUsernames: builder.query<
      IUsernameFrenTransformedDto,
      IUsernameRequest
    >({
      providesTags: ["USERNAME-FREN"],
      query: ({ usernamePart, skip }) => ({
        document: gql`
          query getFrenUsernames($usernamePart: String, $skip: Int) {
            profiles(
              first: 15
              skip: $skip
              where: { username_starts_with: $usernamePart }
            ) {
              id
              avatar
              username
              owner
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
      transformResponse: (response: IUsernameFrenDto) => {
        return {
          usernames: response.profiles.map(({ avatar, username, owner }) => {
            return {
              avatar,
              name: username,
              address: owner,
            };
          }),
          hasMore: response.profiles.length !== 0,
        };
      },
    }),
    getFrenUsernameInfo: builder.query<
      IUsernameFrenInfoDto,
      IUsernameFrenInfoResponse
    >({
      providesTags: ["USERNAME-FREN-INFO"],
      query: ({ address }) => ({
        document: gql`
          query getFrenUsernames($owner: Bytes) {
            profiles(first: 15, where: { owner: $owner }) {
              id
              avatar
              username
              owner
              description
              bios(first: 10) {
                key
                value
              }
            }
          }
        `,
        variables: {
          owner: address,
        },
      }),
      transformResponse: (data: any) => {
        return data?.profiles[0];
      },
    }),
    getFrenUsernameAddress: builder.query<
      Pick<IUsernameFrenInfoDto, "owner">,
      IGetUsernameFrenAddressResponse
    >({
      providesTags: ["USERNAME-FREN-INFO"],
      query: ({ username }) => ({
        document: gql`
          query getFrenUsernames($owner: String) {
            profiles(first: 15, where: { username: $owner }) {
              username
              owner
            }
          }
        `,
        variables: {
          owner: username,
        },
      }),
      transformResponse: (data: any) => {       
        return data?.profiles[0].owner;
      },
    }),
  }),
});
