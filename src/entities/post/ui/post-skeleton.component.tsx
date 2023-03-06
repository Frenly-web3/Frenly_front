import * as React from "react";

export interface IPostSkeletonProps {}

export function PostSkeleton(props: IPostSkeletonProps) {
  return (
    <>
      <div className="h-[34.75rem] lg:min-w-[34.75rem] md:max-w-[34.75rem] bg-black/40 animate-pulse mb-4 py-4 rounded-[2rem]">
        <div className="px-4 flex flex-col mb-4">
          <div className="flex mb-4">
            <div className="bg-black/50 animate-pulse rounded-full w-8 aspect-square mr-2"></div>
            <div className="rounded-md h-4 w-20 bg-black/50"></div>
          </div>
          <div className="rounded-md h-10 w-full bg-black/50"></div>
        </div>
        <div className="mx-auto h-[17rem] bg-black/50 animate-pulse"></div>
      </div>
    </>
  );
}
