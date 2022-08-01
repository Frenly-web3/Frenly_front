import { Meta } from '@components/meta/meta.component'
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
