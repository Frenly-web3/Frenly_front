// eslint-disable-next-line import/no-cycle
import {
  PostCommentButton,
  PostCommentList,
  PostReactionContext,
  usePostComment,
} from '@features/post-comment'
import { PostLikeButton, usePostLike } from '@features/post-like'
import type { NetworkEnum } from '@shared/lib'
import { TransactionLink } from '@shared/ui'
import React, { memo } from 'react'

import { usePostCardContext } from '../model'

interface IPostCardReactions {}

export const PostCardReactions = memo((props: IPostCardReactions) => {
  const {} = props
  const { network, txHash, id } = usePostCardContext()
  const [isOpen, setIsOpen] = React.useState(false)
  const { comments, addComment, isError: commentsError } = usePostComment({ postId: id! })
  const { isError: likesError, isLiked, likeUnlike, count } = usePostLike({ postId: id! })

  const value = {
    comments: { comments, addComment, isError: commentsError },
    likes: { isError: likesError, isLiked, likeUnlike, count },
  }

  return (
    <PostReactionContext.Provider value={value}>
      <div className={`mt-1 flex items-center justify-between`}>
        <TransactionLink network={network as NetworkEnum} txHash={txHash as string} />
      </div>
      <div className={`flex gap-2 justify-end`}>
        <PostCommentButton setIsOpen={setIsOpen} />
        <PostLikeButton />
      </div>
      <PostCommentList setIsOpen={setIsOpen} isOpen={isOpen} />
    </PostReactionContext.Provider>
  )
})
