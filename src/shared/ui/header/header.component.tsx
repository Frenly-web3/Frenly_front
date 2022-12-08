import { useUnificationFormatImage } from '@shared/lib'
import Image from 'next/image'
import { useRouter } from 'next/router'

export interface IHeaderProperties {
  avatar: string | null
  userLensId: string | null
  isLoading: boolean
  userAddress: string | null
}

export function Header(props: IHeaderProperties): JSX.Element {
  const { avatar, userLensId, isLoading, userAddress } = props

  const avatarUnification = useUnificationFormatImage({ image: avatar as string })

  // const { previewValue: avatarTry } = useUploadAvatar({ profileId: userAddress })
  const router = useRouter()

  return (
    // changed userLensId to userAddress
    <header className="container py-3 top-0 bg-white">
      <>
        <div className="flex justify-between mb-1 sticky border-b border-border-color pt-2 pb-4">
          <div className="flex flex-row justify-between">
            <Image src="/assets/icons/eyesLogo.svg" alt="eyes" width={28} height={24} />
            <h2 className="text-4xl font-bold ml-3">frenly feed</h2>
          </div>

          {avatarUnification ? (
            <div className="mr-4 flex items-center border rounded-full border-border-color overflow-hidden self-start">
              <img
                src={avatarUnification}
                alt={'avatar'}
                className={`cursor-pointer w-7 h-7`}
                onClick={() => {
                  if (userAddress !== null) {
                    // changed to userAddress
                    router.push(`profile/${userAddress}`)
                  } else {
                    router.push('/auth')
                  }
                }}
              />
            </div>
          ) : (
            <>
              {isLoading ? (
                <div
                  onClick={() => {
                    if (userAddress !== null) {
                      router.push(`profile/${userAddress}`)
                    } else {
                      router.push('/auth')
                    }
                  }}
                  className="mt-4 w-7 h-7 rounded-full bg-gray animate-pulse"
                ></div>
              ) : (
                <>
                  <img
                    onClick={() => {
                      if (userAddress !== null) {
                        router.push(`profile/${userAddress}`)
                      } else {
                        router.push('/auth')
                      }
                    }}
                    src={'/assets/images/temp-avatar.png'}
                    alt={'avatar'}
                    className={`cursor-pointer w-7 h-7`}
                  />
                </>
              )}
            </>
          )}
        </div>
      </>
    </header>
  )
}
