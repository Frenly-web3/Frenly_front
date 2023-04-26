import type { IComment } from "@entities/comment";
import { reactionsApi } from "@shared/api";
import { IAddress } from "@shared/lib";
import React, { useState } from "react";
import { useAccount } from "wagmi";

interface IProperties {
  postId: number;
  take?: number;
  skip?: number;
}

export const usePostComment = (props: IProperties) => {
  const { postId } = props;
  const { address } = useAccount();

  const [skip, setSkip] = useState(0);

  const { data: commentsData, isError: reactionsError } =
    reactionsApi.useGetCommentsByIdQuery({ postId, take: 10, skip: 10 * skip });
  const [commentMutation, { isError: mutationError }] =
    reactionsApi.useCreateCommentMutation();
  const [comments, setComments] = React.useState<IComment[]>([]);

  React.useEffect(() => {
    if (commentsData?.comments) setComments(commentsData.comments);
  }, [commentsData]);

  const addComment = (
    description: string,
    addresses: {
      [key: string]: IAddress;
    }
  ) => {
    setComments((previous) => {
      let newId = 10000;
      return [
        ...previous,
        { description, creator: address as IAddress, id: newId },
      ];
    });
    let addressesForNotifications: IAddress[] = [];
    description.split(" ").forEach((word) => {
      const wordWithoutTag = word.slice(1);

      const existedWord = Object.keys(addresses).find(
        (el) => el === wordWithoutTag
      );

      if (existedWord) {
        addressesForNotifications.push(addresses[existedWord] as IAddress);
      }
    });

    commentMutation({
      comment: description,
      postId,
      mentions: addressesForNotifications,
    });
  };

  return {
    addComment,
    comments,
    loadMore: () => {
      setSkip((prev) => prev + 1);
    },
    hasMore: commentsData?.hasMore,
    commentsQuantity:
      comments.length + (commentsData?.commentsRemaining as number),
    isError: {
      reactions: reactionsError,
      mutation: mutationError,
    },
  };
};
