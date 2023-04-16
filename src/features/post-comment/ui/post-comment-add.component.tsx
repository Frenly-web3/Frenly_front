import React, { useState } from "react";
import { PostCommentInput } from "./post-comment-input.component";

interface IProperies {
  addComment: (description: string) => void;
}

export const PostCommentAdd = (props: IProperies) => {
  const { addComment } = props;

  const [comment, setComment] = useState("");

  const handler = () => {
    addComment(comment);
    setComment("");
  };

  return (
    <>
      <style jsx>{`
        .icon {
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
        }
      `}</style>
      <div className="flex gap-2 flex-1">
        <PostCommentInput comment={comment} setComment={setComment} />
        <button className="" type="submit" onClick={handler}>
          <div className="text-main text-2xl font-icon leading-4 icon">
            send
          </div>
        </button>
      </div>
    </>
  );
};
