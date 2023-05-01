import { ReactElement, useMemo } from "react";
import { CommentMention } from "../ui/comment-mention.component";

export const useTransformComment = ({ comment }: { comment: string }) => {
  return useMemo(() => {
    let result: (string | ReactElement)[] = [];
    comment.split(/(?=@)(.*?)(?= )/).forEach((item, index, array) => {
      if (!item) return;
      if (item[0] === "@" && item.slice(-4) === ".eth") {
        result.push(<CommentMention username={item} />);
        return;
      }

      result.push(<span className="break-words">{item}</span>);
      return;
    });

    return result;
  }, []);
};
