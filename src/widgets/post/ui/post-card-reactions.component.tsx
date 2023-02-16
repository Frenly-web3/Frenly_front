// eslint-disable-next-line import/no-cycle
import { SmallUserCard } from "@entities/user";
import {
  PostCommentAdd,
  PostCommentButton,
  PostCommentList,
  PostReactionContext,
  usePostComment,
} from "@features/post-comment";
import { PostLikeButton, usePostLike } from "@features/post-like";
import { IAddress } from "@shared/lib";
import { AdaptiveModal } from "@shared/ui";
import React from "react";

import { usePostCardContext } from "../model";

interface IPostCardReactions {}

export function PostCardReactions(props: IPostCardReactions) {
  const {} = props;
  const { id, ownerAddress } = usePostCardContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    comments,
    addComment,
    isError: commentsError,
    commentsRemaining,
  } = usePostComment({ postId: id, take: 5, skip: 0 });

  const {
    isError: likesError,
    isLiked,
    likeUnlike,
    count,
  } = usePostLike({ postId: id });

  const value = {
    comments: {
      commentsShort: comments.slice(-2),
      comments: comments,
      addComment,
      isError: commentsError,
      commentsRemaining,
    },
    likes: { isError: likesError, isLiked, likeUnlike, count },
  };

  return (
    <div className="px-4">
      <PostReactionContext.Provider value={value}>
        <div className={`flex items-center justify-start`}>
          <div className={`flex gap-2 justify-start`}>
            <PostLikeButton />
            <PostCommentButton setIsOpen={setIsOpen} />
          </div>
        </div>

        <PostCommentList withShowMore setIsOpen={setIsOpen} isOpen={isOpen} />
        <PostCommentAdd addComment={addComment} />
        <AdaptiveModal
          classNamesDrawer={{
            body: "px-4 pb-4 m-0 py-0",
            header: "p-2 m-0 border-b-black/5 border-b-2",
            title: "w-full m-0",
            closeButton: "absolute right-2 top-2",
            drawer: "h-full rounded-t-3xl",
          }}
          classNamesModal={{
            body: "px-4 pb-4 rounded-b-3xl",
            header: "p-2 m-0 border-b-black/5 border-b-2",
            title: "w-full m-0",
            close: "absolute right-2 top-2",
          }}
          title={<SmallUserCard address={ownerAddress as IAddress} />}
          opened={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div className="overflow-y-scroll md:h-56 max-md:h-[38rem] mb-1">
            <PostCommentList setIsOpen={setIsOpen} isOpen={isOpen} />
          </div>
          <div className="mt-4">
            <PostCommentAdd addComment={addComment} />
          </div>
        </AdaptiveModal>
      </PostReactionContext.Provider>
    </div>
  );
}
