import React, { useState } from "react";
import { PostCommentInput } from "./post-comment-input.component";
import { IAddress } from "@shared/lib";

interface IProperies {
  addComment: (
    description: string,
    addresses: {
      [key: string]: IAddress;
    }
  ) => void;
}
// type MentionAddresses = { [key: string]: IAddress };
export const PostCommentAdd = (props: IProperies) => {
  const { addComment } = props;

  const [comment, setComment] = useState("");
  const [mentionAddresses, setMentionAddresses] = useState<{
    [key: string]: IAddress;
  }>({});

  const handler = () => {
    addComment(comment, mentionAddresses);
    setComment("");
    setMentionAddresses({});
  };

  return (
    <div className="w-full">
      <style jsx>{`
        .icon {
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
        }
      `}</style>
      <div className="flex gap-2 flex-1">
        <PostCommentInput
          setMentionAddresses={setMentionAddresses}
          comment={comment}
          setComment={setComment}
          sendMessage={handler}
        />
        <button className="" type="submit" onClick={handler}>
          <div className="text-main text-2xl font-icon leading-4 icon">
            send
          </div>
        </button>
      </div>
    </div>
  );
};
