import { Meta } from '@components/meta/meta.component'
import { useGetPhotoQuery } from '@store/photos/photos.api'
import { useRouter } from 'next/router'
import * as React from 'react'
import { Main } from 'src/layouts/main.layout'

export interface IPhotoPageProps {}

export default function PhotoPage(props: IPhotoPageProps) {
  const router = useRouter()
  const { id } = router.query
  const { data: photo } = useGetPhotoQuery({ id: id as string })
  return (
    <Main meta={<Meta description="photo page" title="photo page" />}>
      {photo && JSON.stringify(photo)}
    </Main>
  )
}
