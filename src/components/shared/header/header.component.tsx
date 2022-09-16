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
    <header className="container py-3 sticky top-0 bg-white z-50">
      {showAddPost ? (
        <div className="flex justify-between mb-1">
          <Image src="/assets/icons/eyesLogo.svg" alt="eyes" width={28} height={24} />
          <button
            className="bg-main py-1 px-4 text-center text-white rounded-full font-semibold"
            onClick={() => router.push('/drafts')}
          >
            Add post
          </button>
        </div>
      ) : (
        <div className="py-2 flex">
          <button onClick={() => router.back()} className="flex items-center mr-4">
            <Image src="/assets/icons/arrow-back.svg" alt="back" width={10} height={19} />
          </button>
          {showPostAuthor && <Author avatar="" name="test" date="temp" />}
        </div>
      )}
      <h2 className="text-4xl font-bold">{title}</h2>
    </header>
  )
}
