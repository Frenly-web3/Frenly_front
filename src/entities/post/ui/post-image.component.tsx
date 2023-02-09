import { useUnificationFormatImage } from '@shared/lib'
import React from 'react'

interface IPostContentProperties {
  address: string
  image: {
    type: string
    url: string
  }
  chosedImage?: number
  imagesCount?: number
}
export const PostImage = (props: IPostContentProperties) => {
  // const { address, image } = props
  const { image, chosedImage, imagesCount } = props

  // const { formatToShortAddress } = useFormatToShortAddress()

  const unificationImage = useUnificationFormatImage({ image })

  console.log(imagesCount)
  return (
    <div className="">
      <div className="relative overflow-hidden">
        {unificationImage ? (
          <>
            {unificationImage.type === 'image' ? (
              <img
                src={unificationImage.url.toString()}
                alt={unificationImage.url.toString()}
                className="m-auto"
              />
            ) : (
              <video src={unificationImage.url.toString()} />
            )}
          </>
        ) : (
          <div className="flex flex-col p-10 gap-2 items-center justify-center aspect-square w-full bg-gray">
            <img
              src={'/assets/icons/sadEyes.svg'}
              alt="Sad eyes logo"
              className="w-24 h-full "
            />
            <span className="text-sm font-normal text-white">
              Currently we don{"'"}t support this type of token :{'('}
            </span>
          </div>
        )}
        {imagesCount && (
          <div className="absolute right-3 top-3 z-50 rounded-full bg-black/40 px-3 py-2 text-sm font-medium text-white">
            {(chosedImage as number) + 1} / {imagesCount}
          </div>
        )}
        {/* <div className="absolute left-3 bottom-3 z-20 rounded-full bg-[#00000040] px-3 py-2 text-sm font-medium text-white">
          {'Frenly post'}
        </div> */}
      </div>
    </div>
  )
}
