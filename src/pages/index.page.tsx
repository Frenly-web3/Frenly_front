import { Meta } from '@layouts/meta/meta'
import { Main } from '@templates/main.template'
import { useRouter } from 'next/router'

const Index = () => {
  const router = useRouter()

  return (
    <Main meta={<Meta title="NextJS template" description="NextJS template" />}>
      <></>
    </Main>
  )
}

export default Index
