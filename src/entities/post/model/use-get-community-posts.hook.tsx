import type { IPostDto } from "@shared/api";
import { contentApi } from "@shared/api";
import { SIZE_POST_CHUNK } from "@shared/lib";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useMemo, useState } from "react";

import type { IPost } from "./post.entity";

interface IGetFilteredPosts {
  posts: IPost[];
  isSuccess: boolean;
  hasMore: boolean;
  refetchFilteredFeed: () => void;
  setTakeCount: Dispatch<SetStateAction<number>>;
}

interface IProperties {
  communityId: string;
}

export const useGetCommunityPosts = (props: IProperties): IGetFilteredPosts => {
  const { communityId } = props;
  const [takeCount, setTakeCount] = useState(0);

  const { data: postsData, isSuccess } = contentApi.useGetCommunityFeedQuery({
    take: SIZE_POST_CHUNK,
    skip: SIZE_POST_CHUNK * takeCount,
    communityId,
  });

  const [postsSum, setPostsSum] = useState<IPost[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const reloadPosts = () => {
    setPostsSum([]);
    setTakeCount(0);
  };

  const postsWithoutZeroX = postsData?.posts
    ?.filter((el: any) => {
      return el.postType === 0;
    })
    .filter((el: any) => {
      return !el.isMirror;
    });
  useEffect(() => {
    if (!postsData) {
      return;
    }

    const posts: IPost[] = postsWithoutZeroX!.map((post: IPostDto): IPost => {
      return post as unknown as IPost;
    });

    if (posts?.length === 0) {
      setHasMore(false);
    }
    if (posts) {
      setPostsSum((previous) => [
        ...previous,
        ...posts.filter((post) => Object.keys(post).length > 0),
      ]);
    }
  }, [postsData]);

  return useMemo(
    () => ({
      posts: postsSum,
      isSuccess,
      hasMore,
      refetchFilteredFeed: reloadPosts,
      setTakeCount,
    }),
    [hasMore, isSuccess, postsSum]
  );
};
