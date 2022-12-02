import { useFormatToShortAddress, useUnificationFormatImage } from '@shared/lib'
import React from 'react'

interface IPostContentProperties {
  address: string
  image: string | null
}
export const PostImage = (props: IPostContentProperties) => {
  const { address, image } = props

  const { formatToShortAddress } = useFormatToShortAddress()

  const unificationImage = useUnificationFormatImage({ image: image as string })

  return (
    <div className="">
      <div className="relative rounded-lg overflow-hidden mt-1">
        {unificationImage ? (
          <>
            <img
              src={unificationImage}
              alt={unificationImage}
              className="m-auto rounded-lg "
            />
          </>
        ) : (
          <div className="relative">
            <div className="flex items-start h-96 w-full bg-main animate-pulse rounded-lg"></div>
            <span className="absolute bottom-4 left-6 text-sm font-normal text-white">
              {formatToShortAddress({ address })}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
