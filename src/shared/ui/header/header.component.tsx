import Image from 'next/image'
import { useRouter } from 'next/router'
import { memo } from 'react'
import { useEnsAvatar } from 'wagmi'

export interface IHeaderProperties {
  avatar: string | null
  userLensId: string | null
  isLoading: boolean
  userAddress: string | null
}

export const Header = memo((props: IHeaderProperties): JSX.Element => {
  const {
    // avatar,
    //  userLensId,
    // isLoading,
    userAddress,
  } = props
  const { data: ensAvatar, isLoading: avatarLoading } = useEnsAvatar({
    address: userAddress as `0x${string}`,
  })

  // const avatarUnification = useUnificationFormatImage({
  //   image: { url: avatar as string, type: 'image' },
  // })

  // const { previewValue: avatarTry } = useUploadAvatar({ userAddress: userAddress })
  const router = useRouter()

  return (
    // changed userLensId to userAddress
    <header className="container py-3 top-0 bg-white">
      <>
        <div
          className={`flex justify-between items-center mb-1 sticky border-b border-border-color pt-2 pb-4`}
        >
          <div className="flex flex-row justify-between">
            <Image src="/assets/icons/eyesLogo.svg" alt="eyes" width={28} height={24} />
            <h2 className="text-4xl font-bold ml-3">frenly feed</h2>
          </div>

          <div className="mr-4 w-7 h-7 border rounded-full border-border-color overflow-hidden">
            <Image
              width={112}
              height={112}
              src={ensAvatar || '/assets/images/temp-avatar.png'}
              alt={'avatar'}
              className={`cursor-pointer ${avatarLoading && 'animate-pulse'}`}
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
        </div>
      </>
    </header>
  )
})
