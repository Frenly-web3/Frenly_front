// eslint-disable-next-line boundaries/element-types
import { Avatar, Name } from "@entities/user";
import Link from "next/link";

import type { IComment } from "../model";

interface IProperies {
  comment: IComment;
}
export const Comment = (props: IProperies) => {
  const { comment } = props;
  const profileLink = `/profile/${comment.creator}`;

  return (
    <div className="flex gap-2">
      <Link href={profileLink}>
        <Avatar width={24} className={"w-6 aspect-square"} address={comment.creator} />
      </Link>
      <div>
        <Link href={profileLink}>
          <Name
            className={"font-rounded font-medium"}
            address={comment.creator}
          />
        </Link>
        <div className="font-rounded text-black/80 font-normal">
          {comment.description}
        </div>
      </div>
    </div>
  );
};
