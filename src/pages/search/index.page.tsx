import { SearchBlock } from '@features/search-user'
import { Layout } from '@widgets/layout'
import * as React from 'react'

export default function SearchPage() {
  return (
    <Layout title="search">
      <section className="container">
        <SearchBlock />
      </section>
    </Layout>
  )
}
