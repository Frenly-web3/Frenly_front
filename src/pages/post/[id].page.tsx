import { IPost } from "@entities/post";
import { NetworkEnum, TokenTypeEnum, TransferTypeEnum } from "@shared/lib";
import { Meta } from "@shared/ui";
import { Layout } from "@widgets/layout";
import { PostCard } from "@widgets/post";
import * as React from "react";

export interface IPostPageProps {}

const post = {
  creationDate: "2023-04-17T04:53:59.000Z",
  postType: TokenTypeEnum.ERC20,
  id: 103080,
  isMirror: false,
  mirrorDescription: "null",
  ownerAddress: "0x3e57efef507b4db7acfa2ee79ceca6b19e18d106",
  transactionHash:
    "0xd386a214f248feb9b8e6ae9149e036e1dac0479a483d8c8b32150f2ac021ca07",
  transferType: TransferTypeEnum.BURN,
  actions: [
    {
      blockchainType: NetworkEnum.Ethereum,
      fromAddress: "0x51850f5433d56efc0f5696d52800196e095bdb90",
      toAddress: "0x3e57efef507b4db7acfa2ee79ceca6b19e18d106",
      community: {
        id: 1844,
        name: "null",
        contractAddress: "0x4b15a9c28034dc83db40cd810001427d3bd7163d",
        description: "null",
        image: "null",
        contractName: "HV-MTL",
        contractSymbol: "HV-MTL",
        externalUrl: "null",
        twitterUserName: "null",
        discordUrl: "null",
        openseaCollectionName: "null",
        membersAmount: 1,
      },
      tokenId: "506",
      tokensAmount: 1,
      tokenName: "",
      image:
        "https://nft-cdn.alchemy.com/eth-mainnet/bc89a5d33e2e1d8ed9a05b66c3dceade.jpeg",
      tokenUri: "",
      // fileProvider: 0,
      // fileExtension: null,
    },
  ],
};

export default function PostPage(props: IPostPageProps) {
  return (
    <Layout title="">
      <Meta title={`post on frenly`} description={`post on frenly`} />
      {post && (
        <PostCard {...post as IPost} key={post.id}>
          <PostCard.Author />
          <PostCard.Content />
          <PostCard.Image />
          <PostCard.Reactions />
        </PostCard>
      )}
    </Layout>
  );
}
