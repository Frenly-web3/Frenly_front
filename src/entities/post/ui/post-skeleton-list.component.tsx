import * as React from "react";
import { PostSkeleton } from "./post-skeleton.component";

export interface IPostSkeletonListProps {}

export function PostSkeletonList(props: IPostSkeletonListProps) {
  return (
    <div>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  );
}
