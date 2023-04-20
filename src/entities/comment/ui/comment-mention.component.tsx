import Link from "next/link";
import * as React from "react";
import { useEnsAddress } from "wagmi";

export interface ICommentMentionProps {
  username: string;
}

export function CommentMention(props: ICommentMentionProps) {
  const { username } = props;

  const { data: address } = useEnsAddress({ name: username.slice(1) });

  return (
    <Link
      className="font-rounded font-medium"
      href={`/profile/${address}`}
    >
      {username.length > 20
        ? `${username.slice(0, 4)}...${username.slice(-7)}`
        : username}
    </Link>
  );
}
