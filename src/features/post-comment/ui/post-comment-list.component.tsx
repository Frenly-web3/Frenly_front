import { Comment } from "@entities/comment";
import { Dispatch, SetStateAction } from "react";
import React from "react";

import { usePostReactionContext } from "../model";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMediaQuery } from "@mantine/hooks";

interface IProperties {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  withShowMore?: boolean;
}

export const PostCommentList = (props: IProperties) => {
  const { setIsOpen, withShowMore = false } = props;
  const {
    comments,
    commentsShort,
    isError,
    hasMore,
    loadMore,
    commentsQuantity,
  } = usePostReactionContext()!.comments;

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {(isError.mutation || isError.reactions) && "something went wrong"}

      <>
        <div className="flex flex-col gap-4 max-w-full">
          {!withShowMore && (
            <InfiniteScroll
              hasMore={hasMore}
              loader={"Loading..."}
              dataLength={comments.length ?? 0}
              next={loadMore}
              height={isMobile ? 700 : 400}
              className="flex gap-y-1 flex-col"
            >
              {comments.map((comment, index) => {
                return <Comment key={index} comment={comment} />;
              })}
            </InfiniteScroll>
          )}
          {withShowMore &&
            commentsShort
              .map((comment, index) => {
                return <Comment key={comment.id} comment={comment} />;
              })
              .reverse()}
          {withShowMore && commentsQuantity > 2 && (
            <button
              onClick={() => setIsOpen(true)}
              className="text-main text-left my-1"
            >
              {commentsQuantity - 2} more comments...
            </button>
          )}
        </div>
        {/* <button
            className="w-full p-2 bg-overlay-1-solid mt-4 rounded-[.5rem]"
            onClick={() => setIsOpen(false)}
          >
            Hide comments
          </button> */}
      </>
    </>
  );
};
