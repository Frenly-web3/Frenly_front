import * as React from "react";

export interface ITokensSkeletonProps {}

export function TokensSkeleton(props: ITokensSkeletonProps) {
  return (
    <div className="">
      <div
        className={`w-full aspect-square rounded-2xl overflow-hidden bg-black/20 animate-pulse`}
      ></div>
    </div>
  );
}
