import { ReactElement, useMemo } from "react";
import { CommentMention } from "../ui/comment-mention.component";
import { UsernameTypeEnum } from "@shared/lib";

export const useTransformComment = ({ comment }: { comment: string }) => {
  return useMemo(() => {
    let result: (string | ReactElement)[] = [];
    comment.split(/(?=@)(.*?)(?= )/).forEach((item, index, array) => {
      if (!item) return;
      if (
        item[0] === "@" &&
        (item.slice(-4) === ".eth" || item.slice(-5) === ".fren")
      ) {
        result.push(
          <CommentMention
            username={item}
            usernameType={
              item.slice(-4) === ".eth"
                ? UsernameTypeEnum.ETH
                : UsernameTypeEnum.FRENLY
            }
          />
        );
        return;
      }

      result.push(<span className="break-words">{item}</span>);
      return;
    });

    return result;
  }, []);
};
