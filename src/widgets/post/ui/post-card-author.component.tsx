import { Author } from "@entities/user";

import { usePostCardContext } from "../model";

export function PostCardAuthor() {
  const { creationDate, owner } = usePostCardContext();

  return (
    <div className="px-4 flex justify-between items-center">
      <Author postOwner={owner} date={creationDate} />
    </div>
  );
}
