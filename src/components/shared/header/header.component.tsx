import Author from '@components/shared/author/author.component'
import Image from 'next/image'
import { useRouter } from 'next/router'

export interface IHeaderProperties {
  title: string
  showAddPost?: boolean
  showPostAuthor?: boolean
  isOwner?: boolean
  accountId?: string
  nickname?: string
}

export default function Header(props: IHeaderProperties): JSX.Element {
  const { title, showAddPost = false, showPostAuthor = false, isOwner, accountId, nickname } = props
  const router = useRouter()

  return (
    <header className="container py-3 top-0 bg-white">
      {showAddPost ? (
        <>
          <div className="flex justify-between mb-1">
            <Image src="/assets/icons/eyesLogo.svg" alt="eyes" width={28} height={24} />
            <button
              className="bg-main py-1 px-4 text-center text-white rounded-full font-semibold"
              onClick={() => router.push(`/profile/${accountId}`)}
            >
              Add post
            </button>
          </div>
          <h2 className="text-4xl font-bold">{title}</h2>
        </>
      ) : (
        <div className="flex flex-col justify-center border-b border-border-color">
          <div className="py-2 flex justify-between">
            <button onClick={() => router.push('/feed')} className="flex items-center mr-4">
              <Image src="/assets/icons/arrow-back.svg" alt="back" width={10} height={19} />
            </button>
            <h3 className="py-2 text-xl font-bold">{nickname || ''}</h3>
            <button>
              <Image src="/assets/icons/share.svg" alt="back" width={18} height={24} />
            </button>
          </div>
          <div className="m-auto mt-3">
            <Image
              src={'/assets/images/temp-avatar.jpg'}
              className="align-center"
              alt="avatar"
              width={96}
              height={96}
            />
          </div>

          <div className="text-base font-normal text-gray mb-8 text-center m-auto mt-4">
            {'Low-key web3 founder, part-time designer, full-time dreamer'}
          </div>
          {!isOwner && (
            <button className="rounded-full bg-main py-2 text-white text-sm font-semibold w-23 pl-4 pr-4 m-auto mb-8">
              FOLLOW
            </button>
          )}
        </div>
      )}
    </header>
  )
}
