import { useUnificationFormatImage } from '@shared/lib'
import React from 'react'

interface IPostContentProperties {
  address: string
  image: {
    type: string
    url: string
  }
}
export const PostImage = (props: IPostContentProperties) => {
  // const { address, image } = props
  const { image } = props

  // const { formatToShortAddress } = useFormatToShortAddress()

  const unificationImage = useUnificationFormatImage({ image })

  return (
    <div className="">
      <div className="relative overflow-hidden">
        {unificationImage ? (
          <>
            {unificationImage.type === 'image' ? (
              <img
                src={unificationImage.url.toString()}
                alt={unificationImage.url.toString()}
                className="m-auto "
              />
            ) : (
              <video src={unificationImage.url.toString()} />
            )}
          </>
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center h-48 w-full bg-gray">
            <img
              src={'/assets/icons/sadEyes.svg'}
              alt="Sad eyes logo"
              className="w-24 h-24"
            />
            <span className="text-sm font-normal text-white">
              Currently we don{"'"}t support this type of token :{'('}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
