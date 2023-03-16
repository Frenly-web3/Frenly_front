import * as React from "react";

export interface INotificationSkeletonProps {
  isFollow: boolean;
}

export function NotificationSkeleton(props: INotificationSkeletonProps) {
  const { isFollow } = props;

  return (
    <div className="flex justify-between items-center py-1 pr-1">
      <div className="flex gap-3">
        <div className="relative">
          <div className="w-10 aspect-square rounded-full bg-black/10 animate-pulse"></div>
          <div className="w-4 aspect-square rounded-full bg-[#cccccc] animate-pulse absolute -bottom-1 -right-1"></div>
        </div>
        <div className="flex flex-col justify-around">
          <div className="w-52 h-3 bg-black/10 animate-pulse rounded-2xl"></div>{" "}
          <div className="w-20 h-3 bg-black/10 animate-pulse rounded-2xl"></div>
        </div>
      </div>

      {isFollow ? (
        <div className="relative">
          <div className="w-10 aspect-square rounded-lg bg-black/10 animate-pulse"></div>
          <div className="w-4 aspect-square rounded-full bg-[#cccccc] animate-pulse absolute top-0 -right-1"></div>
        </div>
      ) : (
        <div className="w-20 h-8 rounded-full bg-black/10 animate-pulse"></div>
      )}
    </div>
  );
}
