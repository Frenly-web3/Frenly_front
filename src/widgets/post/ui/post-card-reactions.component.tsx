import { PostCommentButton, PostCommentList } from '@features/post-comment'
import { PostLikeButton } from '@features/post-like'
import type { NetworkEnum } from '@shared/lib'
import { TransactionLink } from '@shared/ui'
import React from 'react'

import { usePostCardContext } from '../model'

interface IPostCardReactions {}

export function PostCardReactions(props: IPostCardReactions) {
  const {} = props
  const { network, txHash, id } = usePostCardContext()
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      <div className={`mt-1 flex items-center justify-between`}>
        <TransactionLink network={network as NetworkEnum} txHash={txHash as string} />
      </div>
      <div className={`flex gap-2 justify-end`}>
        <PostCommentButton postId={id!} setIsOpen={setIsOpen} />
        <PostLikeButton postId={id!} />
      </div>
      <PostCommentList postId={id!} setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  )
}
