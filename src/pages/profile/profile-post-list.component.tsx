import { PostSkeletonList, useGetPosts } from "@entities/post";
import { PostList } from "@pages/feed/post-list.component";
import { IAddress } from "@shared/lib";
import { EndOfPage } from "@shared/ui";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export interface IProfilePostProps {
  address: IAddress;
}

export function ProfilePostList(props: IProfilePostProps) {
  const { address } = props;

  const { hasMore, loadMore, posts } = useGetPosts({ address });
  return (
    <div className="p-0 lg:max-w-[37rem]">
      <InfiniteScroll
        dataLength={posts?.length ?? 0}
        next={loadMore}
        hasMore={hasMore}
        loader={<PostSkeletonList />}
        endMessage={<EndOfPage page="drafts" />}
      >
        <PostList posts={posts} />
      </InfiniteScroll>
    </div>
  );
}
