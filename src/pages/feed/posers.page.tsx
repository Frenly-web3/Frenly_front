import { useGetCommunityPosts } from "@entities/post";
import { EndOfPage, ScrollLoader } from "@shared/ui";
import { useChangeAddress } from "@widgets/change-address";
import { Layout } from "@widgets/layout";
import InfiniteScroll from "react-infinite-scroll-component";

import { PostList } from "./post-list.component";
import { RightSection } from "./right-section.component";

export default function FeedPage() {
  const { posts, isSuccess, hasMore, setTakeCount } = useGetCommunityPosts({
    communityId: process.env.NEXT_PUBLIC_POSERS_ID as string,
  });
  useChangeAddress();
  const nextLoad = async () => {
    if (isSuccess) {
      setTakeCount((previousState) => previousState + 1);
    }
  };
  return (
    <Layout
      title="feed - posers"
      rightSidebar={
        <RightSection id={process.env.NEXT_PUBLIC_POSERS_ID as string} />
      }
    >
      <section className="md:container relative">
        <InfiniteScroll
          dataLength={posts.length}
          next={nextLoad}
          hasMore={hasMore}
          loader={<ScrollLoader />}
          endMessage={<EndOfPage page="feed" />}
        >
          <PostList posts={posts} />
        </InfiniteScroll>
      </section>
    </Layout>
  );
}
