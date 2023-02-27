import { contentApi } from "@shared/api";
import { IAddress, SIZE_POST_CHUNK } from "@shared/lib";
import { useEffect, useMemo, useState } from "react";
import { IPost } from "./post.entity";

interface IuseGetPosts {
  address: IAddress;
}

export const useGetPosts = ({ address }: IuseGetPosts) => {
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);

  const { data: postsData, refetch } = contentApi.useGetWalletAddressFeedQuery({
    take: SIZE_POST_CHUNK,
    skip: SIZE_POST_CHUNK * skip,
    address,
  });

  useEffect(() => {
    if (
      postsData &&
      (postsData.totalPosts == 0 ||
        postsData?.totalPosts - postsData?.posts?.length <= 0)
    ) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [postsData]);

  useEffect(() => {
    setSkip(0);
    refetch();
    // setHasMore(true);
  }, [address]);

  // useEffect(() => {
  //   if (skip === 0) {
  //     refetch();
  //   }
  // }, [skip]);

  return useMemo(
    () => ({
      posts: postsData?.posts as unknown as IPost[],
      loadMore: () => {
        setSkip((prev) => prev + 1);
      },
      // refresh: () => {
      //   setSkip(0);
      // },
      hasMore,
    }),
    [postsData, hasMore, address]
  );
};
