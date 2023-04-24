import type { IComment } from "@entities/comment";
import { IAddress } from "@shared/lib";
import React, { useContext } from "react";

interface IPostReactionContext {
  comments: {
    addComment: (
      description: string,
      addresses: {
        [key: string]: IAddress;
      }
    ) => void;
    commentsShort: IComment[];
    comments: IComment[];
    commentsRemaining?: number;
    isError: {
      reactions: boolean;
      mutation: boolean;
    };
  };
  likes: {
    isError: {
      reactions: boolean;
      isLiked: boolean;
      mutation: boolean;
    };
    isLiked: boolean;
    likeUnlike: () => void;
    count: number;
  };
}
export const PostReactionContext =
  React.createContext<IPostReactionContext | null>(null);

export const usePostReactionContext = () => {
  const context = useContext(PostReactionContext);

  if (!PostReactionContext) {
    throw new Error("Post reaction context not exist");
  }

  return context;
};
