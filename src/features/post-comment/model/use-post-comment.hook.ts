import type { IComment } from "@entities/comment";
import { reactionsApi } from "@shared/api";
import { IAddress } from "@shared/lib";
import React from "react";
import { useAccount } from "wagmi";

interface IProperties {
  postId: number;
  take?: number;
  skip?: number;
}

export const usePostComment = (props: IProperties) => {
  const { postId, take, skip } = props;
  const { address } = useAccount();

  const { data: commentsData, isError: reactionsError } =
    reactionsApi.useGetCommentsByIdQuery({ postId, take, skip });
  const [commentMutation, { isError: mutationError }] =
    reactionsApi.useCreateCommentMutation();
  const [comments, setComments] = React.useState<IComment[]>([]);

  React.useEffect(() => {
    if (commentsData?.comments) setComments(commentsData.comments);
  }, [commentsData]);

  const addComment = (description: string) => {
    setComments((previous) => {
      let newId = 10000;
      return [
        ...previous,
        { description, creator: address as IAddress, id: newId },
      ];
    });
    commentMutation({ comment: description, postId });
  };

  return {
    addComment,
    comments,
    commentsRemaining:
      comments.length < 5
        ? comments?.length - 2
        : (commentsData?.commentsRemaining as number) + 3,
    isError: {
      reactions: reactionsError,
      mutation: mutationError,
    },
  };
};
