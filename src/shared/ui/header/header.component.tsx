import Image from 'next/image'
import { useRouter } from 'next/router'

export interface IHeaderProperties {
  avatar: string | null
  userLensId: string | null
  isLoading: boolean
}

export function Header(props: IHeaderProperties): JSX.Element {
  const { avatar, userLensId, isLoading } = props

  const router = useRouter()

  console.log(isLoading)

  return (
    <header className="container py-3 top-0 bg-white">
      <>
        <div className="flex justify-between mb-1 sticky border-b border-border-color pt-2 pb-4">
          <div className="flex flex-row justify-between">
            <Image src="/assets/icons/eyesLogo.svg" alt="eyes" width={28} height={24} />
            <h2 className="text-4xl font-bold ml-3">frenly feed</h2>
          </div>

          {!isLoading ? (
            <div className="mr-4 flex items-center border rounded-full border-border-color overflow-hidden self-start">
              <img
                src={
                  avatar && avatar !== null
                    ? `${process.env.NEXT_PUBLIC_API_URL}avatars/${avatar}`
                    : '/assets/images/temp-avatar.png'
                }
                alt={'avatar'}
                onClick={() => {
                  if (userLensId !== null) {
                    router.push(`profile/${userLensId}`)
                  } else {
                    router.push('/auth')
                  }
                }}
                className={`cursor-pointer w-7 h-7`}
              />
            </div>
          ) : (
            <div
              onClick={() => {
                if (userLensId !== null) {
                  router.push(`profile/${userLensId}`)
                } else {
                  router.push('/auth')
                }
              }}
              className="mt-4 w-7 h-7 rounded-full bg-gray animate-pulse"
            ></div>
          )}
        </div>
      </>
    </header>
  )
}
