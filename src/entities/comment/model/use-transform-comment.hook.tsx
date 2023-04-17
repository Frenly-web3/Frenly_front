import { useMemo } from "react";
import { CommentMention } from "../ui/comment-mention.component";

export const useTransformComment = ({ comment }: { comment: string }) => {
  return useMemo(() => {
    let result: any = [];
    comment.split(/(?=@)(.*?)(?<=.eth)/).forEach((item, index, array) => {
      if (item[0] === "@" && item.slice(-4) === ".eth") {
        result.push(<CommentMention username={item} />);
        return;
      }
      result.push(<>{item}</>);
    });

    return result;
  }, []);
};
