import { SearchBlock } from '@features/search-user'
import { Layout } from '@shared/ui'
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
