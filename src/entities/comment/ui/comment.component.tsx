// eslint-disable-next-line boundaries/element-types

import { Avatar, Name } from "@shared/ui";
import Link from "next/link";

import { IComment, useTransformComment } from "../model";

interface IProperies {
  comment: IComment;
}
export const Comment = (props: IProperies) => {
  const { comment } = props;
  const profileLink = `/profile/${comment.creator}`;

  const transformedComment = useTransformComment({
    comment: comment.description + " ",
  });
  return (
    <div className="flex gap-2">
      <Link href={profileLink}>
        <Avatar
          width={24}
          className={"w-6 aspect-square"}
          address={comment.creator}
        />
      </Link>
      <div className="w-5/6">
        <Link href={profileLink}>
          <Name
            className={"font-rounded font-medium"}
            address={comment.creator}
          />
        </Link>
        <div className="text-black">{transformedComment}</div>
      </div>
    </div>
  );
};
