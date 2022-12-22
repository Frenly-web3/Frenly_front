import { PostImage } from '@entities/post'

import { usePostCardContext } from '../model'

export function PostCardImage() {
  const { image, contractAddress } = usePostCardContext()

  return (
    <div className="">
      <PostImage
        image={{ type: 'image', url: `${image}` }}
        address={contractAddress as string}
      />
    </div>
  )
}
