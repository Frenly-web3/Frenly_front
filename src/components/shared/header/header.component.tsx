import Author from '@components/shared/author/author.component'
import Image from 'next/image'
import { useRouter } from 'next/router'

export interface IHeaderProperties {
  title: string
  showAddPost?: boolean
  showPostAuthor?: boolean
}

export default function Header(props: IHeaderProperties): JSX.Element {
  const { title, showAddPost = false, showPostAuthor = false } = props
  const router = useRouter()

  return (
    <header className="container py-3">
      {showAddPost ? (
        <div className="flex justify-between">
          <Image src="/assets/icons/eyesLogo.svg" alt="eyes" width={28} height={24} />
          <button
            className="bg-main py-1 px-4 text-center text-white rounded-full font-semibold"
            onClick={() => router.push('/myEvents')}
          >
            Add post
          </button>
        </div>
      ) : (
        <div className="py-2">
          <button onClick={() => router.back()}>
            <Image src="/assets/icons/arrow-back.svg" alt="back" width={10} height={19} />
          </button>
          {showPostAuthor && <Author avatar="" name="test" date="temp" />}
        </div>
      )}
      <h2 className="text-4xl font-bold mt-1">{title}</h2>
    </header>
  )
}
