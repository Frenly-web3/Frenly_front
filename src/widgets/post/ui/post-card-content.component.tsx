import { PostContent } from '@entities/post'

import { usePostCardContext } from '../model'

export function PostCardContent() {
  const postCardInfo =
    usePostCardContext()
  return (
    <div className="px-4">
      <PostContent
        {...postCardInfo}
      />
    </div>
  )
}
