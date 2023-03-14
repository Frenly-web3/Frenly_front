import { useConnectPush } from "@features/connect-push-notifications";
import { useChangeAddress } from "@widgets/change-address";
import { Layout } from "@widgets/layout";

import { InfinitePosts } from "./infinite-posts.component";
import { RightSection } from "./right-section.component";

export default function FeedPage() {
  useChangeAddress();

  const { connectPush, subscribed } = useConnectPush();
  console.log(subscribed);

  return (
    <Layout title="feed" rightSidebar={<RightSection />}>
      <button
        onClick={async () => {
          // await requestPermission();
          await connectPush();
        }}
      >
        Send push
      </button>
      <section className="lg:max-w-[37rem] min-w-[18.5rem] md:px-4 relative">
        <InfinitePosts />
      </section>
    </Layout>
  );
}
