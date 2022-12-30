import type { IComment } from '@entities/comment'
import { useGetCommentsByPostId } from '@entities/comment'
import { reactionsApi } from '@shared/api'
import { useGetENSByAddress } from '@shared/lib'
import React from 'react'

import { CommentSend } from './comment-send.component'

interface IComments {
  postId: number
}
export const Comments = (props: IComments) => {
  const { postId } = props
  const [isOpen, setIsOpen] = React.useState(false)

  const { comments, getComments } = useGetCommentsByPostId({ postId })

  const [send, { data }] = reactionsApi.useCreateCommentMutation()

  React.useEffect(() => {
    getComments()
  }, [data])

  const Comment = ({ comment }: { comment: IComment }) => {
    const ens = useGetENSByAddress({ address: comment.creator.walletAddress })
    return (
      <div key={comment.id} className={`mb-4`}>
        <a
          href={`/profile/${comment.creator.walletAddress}`}
          className={`font-bold font-rounded`}
        >
          {ens ||
            `${comment.creator.walletAddress.slice(
              0,
              6
            )}...${comment.creator.walletAddress.slice(-4)}`}
        </a>
        <div>{comment.description}</div>
        <div className={`text-sm text-hidden`}>
          {`${new Date(comment.updateDate).toLocaleDateString()} at ${new Date(
            comment.updateDate
          )
            .toLocaleTimeString()
            .slice(0, 5)}`}
        </div>
      </div>
    )
  }

  if (!isOpen)
    return (
      <button
        className={`w-full py-2 bg-overlay-1-solid rounded-xl hover:bg-overlay-2-solid transition-colors`}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        {comments.length > 0 ? `Show ${comments.length} Comments` : 'Write First Comment'}
      </button>
    )

  return (
    <>
      <div className={`w-full flex flex-col items-start`}>
        <CommentSend send={send} postId={postId} />
        {comments.length > 0
          ? comments.map((comment) => <Comment comment={comment} key={comment.id} />)
          : 'There is no comments yet...'}
      </div>
      <button
        className={`w-full py-2 bg-overlay-1-solid rounded-xl hover:bg-overlay-2-solid transition-colors`}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        Hide Comments
      </button>
    </>
  )
}
