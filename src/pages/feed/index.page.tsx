import { CommunitySingle } from '@widgets/community'
import { Layout } from '@widgets/layout'
import Link from 'next/link'

import { InfinitePosts } from './infinite-posts.component'

export default function FeedPage() {
  return (
    <Layout title="feed">
      <section className="container relative">
        <div className="p-4 bg-white rounded-[1rem] mb-4">
          <CommunitySingle id="2" />
          <Link
            href={'/feed/orange'}
            className="flex max-w-fit px-4 py-2 bg-main mt-2 ml-20 text-white rounded-[1rem]"
          >
            Explore
          </Link>
        </div>
      </section>
      <section className="container relative">
        <InfinitePosts />
      </section>
    </Layout>
  )
}
