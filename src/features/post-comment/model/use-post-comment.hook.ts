import type { IComment } from "@entities/comment";
import { reactionsApi } from "@shared/api";
import { IAddress, QueryOrderDirectionEnum } from "@shared/lib";
import React, { useState } from "react";
// import { useAccount } from "wagmi";
import { COMMENTS_QUANTITY, PREVIEW_COMMENTS } from "../lib";

interface IProperties {
  postId: number;
  take?: number;
  skip?: number;
}

export const usePostComment = (props: IProperties) => {
  const { postId } = props;
  // const { address } = useAccount();

  const [skip, setSkip] = useState(0);

  const { data: commentsData, isError: reactionsError } =
    reactionsApi.useGetCommentsByIdQuery({
      postId,
      take: COMMENTS_QUANTITY,
      skip: COMMENTS_QUANTITY * skip,
      orderDirection: QueryOrderDirectionEnum.ASC,
    });

  const { data: commentsShortData } = reactionsApi.useGetCommentsByIdQuery({
    postId,
    take: PREVIEW_COMMENTS,
    skip: 0,
    orderDirection: QueryOrderDirectionEnum.DESC,
  });

  const [commentMutation, { isError: mutationError }] =
    reactionsApi.useCreateCommentMutation();
  const [comments, setComments] = React.useState<IComment[]>([]);
  const [commentsShort, setCommentsShort] = React.useState<IComment[]>([]);



  React.useEffect(() => {

    if (commentsData?.comments) setComments(commentsData.comments);
  }, [commentsData]);

  React.useEffect(() => {

    if (commentsShortData?.comments)
      setCommentsShort(commentsShortData.comments);
  }, [commentsShortData]);

  const addComment = (
    description: string,
    addresses: {
      [key: string]: IAddress;
    }
  ) => {
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

    // setComments((previous) => {
    //   let newId = 10000;
    //   return [
    //     ...previous,
    //     { description, creator: address as IAddress, id: newId },
    //   ];
    // });
    // setCommentsShort((previous) => {
    //   let newId = 10000;
    //   return [
    //     { description, creator: address as IAddress, id: newId },
    //     ...previous.slice(0, 1),
    //   ];
    // });
  };

  return {
    addComment,
    comments,
    loadMore: () => {
      setSkip((prev) => prev + 1);
    },
    hasMore: commentsData?.hasMore,
    commentsShort,
    commentsQuantity:
      comments.length + (commentsData?.commentsRemaining as number),
    isError: {
      reactions: reactionsError,
      mutation: mutationError,
    },
  };
};
