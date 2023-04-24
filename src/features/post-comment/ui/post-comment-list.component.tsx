import { Comment } from "@entities/comment";
import type { Dispatch, SetStateAction } from "react";
import React from "react";

import { usePostReactionContext } from "../model";

interface IProperties {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  withShowMore?: boolean;
}

export const PostCommentList = (props: IProperties) => {
  const {setIsOpen, withShowMore = false} = props;
  const { comments, commentsShort, isError, commentsRemaining } =
    usePostReactionContext()!.comments

  return (
    <>
      {(isError.mutation || isError.reactions) && "something went wrong"}

      <>
        <div className="flex flex-col gap-4">
          {!withShowMore && comments.map((comment, index) => {
            return <Comment key={index} comment={comment} />;
          })}
          {withShowMore && commentsShort.map((comment, index) => {
            return <Comment key={index} comment={comment} />;
          })}
          {withShowMore && comments.length > 2  && (
            <button onClick={()=>setIsOpen(true)} className="text-main text-left my-1">
              {commentsRemaining} more comments...
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
