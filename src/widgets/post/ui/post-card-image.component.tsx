import { ActionList, IAction, SmallActionList } from "@entities/action";
import { PostImage } from "@entities/post";
import { SmallUserCard } from "@entities/user";
import { IAddress, useLoaderContext } from "@shared/lib";
import { ShowMore } from "@shared/ui";
import { useEffect, useState } from "react";

import { usePostCardContext } from "../model";

export function PostCardImage() {
  const { actions, transferType } = usePostCardContext();

  const { setIsLoading } = useLoaderContext();

  const [showedMore, setShowedMore] = useState(false);

  useEffect(() => {
    setIsLoading(!actions);
  }, [actions]);

  if (!actions) return null;

  return (
    <div className="mb-4">
      {actions.length > 1 ? (
        <div className="mb-4">
          <div className="flex justify-between px-4 pb-4">
            <span className="">{actions.length} NFTs</span>
            <ShowMore
              onClick={() => setShowedMore((prev) => !prev)}
              showMore={showedMore}
            />
          </div>

          {showedMore ? (
            <div className="px-4">
              <SmallActionList actions={actions} />
            </div>
          ) : (
            <ActionList actions={actions} />
          )}
        </div>
      ) : (
        <PostImage
          {...(actions[0] as IAction)}
          transferType={transferType}
          userCard={
            <SmallUserCard address={actions[0]?.fromAddress as IAddress} />
          }
        />
      )}
    </div>
  );
}
