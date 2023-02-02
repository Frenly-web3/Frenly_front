import { CommunitySingle } from '@widgets/community'
import { Layout } from '@widgets/layout'

import { InfinitePosts } from './infinite-posts.component'

export default function FeedPage() {
  return (
    <Layout title="feed" rightSidebar={<CommunitySingle id="2" />}>
      <section className="container relative">
        <InfinitePosts />
      </section>
    </Layout>
  )
}
