import { reactionsApi } from "@shared/api";
import { useState } from "react";

interface IUseGetCommentsByPostIdProperties {
  postId: number;
}

export const useGetCommentsByPostId = (
  props: IUseGetCommentsByPostIdProperties
) => {
  const { postId } = props;

  const [skipCount, setSkipCount] = useState(0);

  const { data, isFetching, isError } = reactionsApi.useGetCommentsByIdQuery({
    postId,
    take: 5,
    skip: 5 * skipCount,
  });

  const loadMoreComments = () => {
    setSkipCount((prev) => prev + 1);
  };

  return { loadMoreComments, data, isFetching, isError };
};
