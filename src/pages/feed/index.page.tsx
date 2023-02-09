import { useChangeAddress } from '@widgets/change-address'
import { CommunitySingle } from '@widgets/community'
import { Layout } from '@widgets/layout'

import { InfinitePosts } from './infinite-posts.component'

export default function FeedPage() {
  useChangeAddress()


  return (
    <Layout
      title="feed"
      rightSidebar={
        <CommunitySingle id={process.env.NEXT_PUBLIC_ORANGE_DAO_ID as string} />
      }
    >
      <section className="container relative">
        <InfinitePosts />
      </section>
    </Layout>
  )
}
