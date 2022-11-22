import { PostImage } from '@entities/post'

import { usePostCardContext } from '../model'

export function PostCardImage() {
  const { image, contractAddress } = usePostCardContext()

  return (
    <div className="pl-14">
      <PostImage image={image} address={contractAddress as string} />
    </div>
  )
}
