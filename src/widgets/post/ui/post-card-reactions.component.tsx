import { CommentList } from '@entities/comment'
import { LikeButton } from '@features/like-post'
import { MirrorButton } from '@features/mirror-post'
import type { NetworkEnum } from '@shared/lib'
import { TransactionLink } from '@shared/ui'

import { usePostCardContext } from '../model'

export function PostCardReactions() {
  const { lensId, network, txHash } = usePostCardContext()
  return (
    <>
      <div className={`mt-1 flex items-center justify-between pl-14`}>
        <TransactionLink network={network as NetworkEnum} txHash={txHash as string} />
        <div className="flex items-center">
          <LikeButton publicationId={lensId as string} />
          {/* <CommentButton publicationId={lensId as string} /> */}
          <MirrorButton publicationId={lensId as string} />
        </div>
      </div>
      <CommentList publicationId={lensId as string} />
    </>
  )
}
