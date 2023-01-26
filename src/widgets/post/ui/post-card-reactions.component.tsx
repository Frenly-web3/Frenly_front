import { Comments } from '@features/comment-post'
import { LikeButton } from '@features/like-post'
import type { NetworkEnum } from '@shared/lib'
import { TransactionLink } from '@shared/ui'

import { usePostCardContext } from '../model'

interface IPostCardReactions {}

export function PostCardReactions(props: IPostCardReactions) {
  const {} = props
  const { network, txHash, id } = usePostCardContext()
  return (
    <>
      <div className={`mt-1 flex items-center justify-between`}>
        <TransactionLink network={network as NetworkEnum} txHash={txHash as string} />
      </div>
      <div className={`flex gap-2 items-end flex-col`}>
        <LikeButton postId={id!} />
        <Comments postId={id!} />
      </div>
    </>
  )
}
