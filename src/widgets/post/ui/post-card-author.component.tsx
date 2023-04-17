import { Author } from "@entities/user";

import { usePostCardContext } from "../model";

export function PostCardAuthor() {
  const { creationDate, ownerAddress } = usePostCardContext();

  return (
    <div className="px-4 flex justify-between items-center">
      <Author address={ownerAddress} date={creationDate} />
    </div>
  );
}
