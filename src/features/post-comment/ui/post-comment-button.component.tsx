import type { Dispatch, SetStateAction } from "react";

import { usePostReactionContext } from "../model";

interface IProperties {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const PostCommentButton = (props: IProperties) => {
  const { setIsOpen } = props;
  const { comments, commentsRemaining } = usePostReactionContext()!.comments;
  return (
    <>
      <style jsx>{`
        .icon {
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
        }
      `}</style>
      <button
        onClick={() => {
          setIsOpen((previous) => !previous);
        }}
        className={`bg-overlay-1-solid text-text px-2 max-w-fit cursor-pointer flex items-center gap-1 transition-colors rounded-full`}
      >
        <div className="font-icon leading-4 icon">chat</div>
        {comments.length < 5
          ? comments?.length
          : (commentsRemaining as number) + 2}
      </button>
    </>
  );
};
