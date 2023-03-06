import { useChangeAddress } from "@widgets/change-address";
import { Layout } from "@widgets/layout";

import { InfinitePosts } from "./infinite-posts.component";
import { RightSection } from "./right-section.component";

export default function FeedPage() {
  useChangeAddress();
  return (
    <Layout title="feed" rightSidebar={<RightSection />}>
      <section className="lg:max-w-[37rem] min-w-[18.5rem] md:px-4 relative">
        <InfinitePosts />
      </section>
    </Layout>
  );
}
