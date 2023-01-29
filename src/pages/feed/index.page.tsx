import { Layout } from '@shared/ui'
import { CommunitySingle } from '@widgets/community'
import Link from 'next/link'

import { InfinitePosts } from './infinite-posts.component'

export default function FeedPage() {
  return (
    <Layout title="feed" avatar={true}>
      <section className="container relative">
        <div className="p-4 bg-overlay-1-solid rounded-[1rem]">
          <CommunitySingle id="1" />
          <Link
            href={'/feed/1'}
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
