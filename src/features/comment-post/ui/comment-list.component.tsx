import { useGetCommentsByPostId } from '@entities/comment'
import { reactionsApi } from '@shared/api'
import React from 'react'

import { CommentSend } from './comment-send.component'

interface IComments {
  postId: number
}
export const Comments = (props: IComments) => {
  const { postId } = props
  const [isOpen, setIsOpen] = React.useState(false)

  const { comments, getComments, isError, isLoading } = useGetCommentsByPostId({ postId })

  const [send, { data }] = reactionsApi.useCreateCommentMutation()

  React.useEffect(() => {
    getComments()
  }, [data])
  const list = comments.map((comment) => {
    return (
      <div key={comment.id} className={`pt-4`}>
        <div className={`font-bold font-rounded`}>
          {`${comment.creator.walletAddress.slice(
            0,
            6
          )}...${comment.creator.walletAddress.slice(-4)}`}
        </div>
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
  })
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
      <div className={`w-full flex flex-col items-start mt-4`}>
        <CommentSend send={send} postId={postId} />
        {comments.length > 0 ? list : 'There is no comments yet...'}
      </div>
      <button
        className={`w-full py-2 bg-overlay-1-solid rounded-xl hover:bg-overlay-2-solid transition-colors mt-4`}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        Hide Comments
      </button>
    </>
  )
}
