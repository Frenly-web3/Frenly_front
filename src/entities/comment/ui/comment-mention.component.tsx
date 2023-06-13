import { frenGraphApi } from "@shared/api";
import { UsernameTypeEnum } from "@shared/lib";
import Link from "next/link";
import * as React from "react";
import { useEnsAddress } from "wagmi";

export interface ICommentMentionProps {
  username: string;
  usernameType: UsernameTypeEnum;
}

export function CommentMention(props: ICommentMentionProps) {
  const { username, usernameType } = props;

  const { data: address } = useEnsAddress({
    name: username.slice(1),
    enabled: usernameType === UsernameTypeEnum.ETH,
  });
  const { data: frenAddress } = frenGraphApi.useGetFrenUsernameAddressQuery(
    { username: username.slice(1, -5) },
    { skip: usernameType === UsernameTypeEnum.ETH }
  );
  return (
    <Link
      className="font-rounded font-medium"
      href={`/profile/${
        usernameType === UsernameTypeEnum.ETH ? address : frenAddress
      }`}
    >
      {username.length > 20
        ? `${username.slice(0, 4)}...${username.slice(-7)}`
        : username}
    </Link>
  );
}
