import { PostImage } from '@entities/post'
import { memo } from 'react'

import { usePostCardContext } from '../model'

export const PostCardImage = memo(() => {
  const { image, contractAddress } = usePostCardContext()

  return (
    <div className="">
      <PostImage
        image={{ type: 'image', url: `${image}` }}
        address={contractAddress as string}
      />
    </div>
  )
})
