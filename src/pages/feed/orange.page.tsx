import { PostSkeletonList, useGetCommunityPosts } from "@entities/post";
import { EndOfPage } from "@shared/ui";
import { useChangeAddress } from "@widgets/change-address";
import { Layout } from "@widgets/layout";
import InfiniteScroll from "react-infinite-scroll-component";

import { PostList } from "./post-list.component";
import { RightSection } from "./right-section.component";

export default function FeedPage() {
  const { posts, isSuccess, hasMore, setTakeCount } = useGetCommunityPosts({
    communityId: process.env.NEXT_PUBLIC_ORANGE_DAO_ID as string,
  });
  useChangeAddress();
  const nextLoad = async () => {
    if (isSuccess) {
      setTakeCount((previousState) => previousState + 1);
    }
  };
  return (
    <Layout
      title="feed - Orange DAO"
      rightSidebar={
        <RightSection id={process.env.NEXT_PUBLIC_ORANGE_DAO_ID as string} />
      }
    >
      <section className="lg:max-w-[37rem] min-w-[18.75rem] md:px-4 relative">
        <InfiniteScroll
          dataLength={posts.length}
          next={nextLoad}
          hasMore={hasMore}
          loader={<PostSkeletonList />}
          endMessage={<EndOfPage page="feed" />}
        >
          <PostList posts={posts} />
        </InfiniteScroll>
      </section>
    </Layout>
  );
}
