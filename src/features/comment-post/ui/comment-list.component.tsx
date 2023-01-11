import { useGetCommentsByPostId } from '@entities/comment'
import { reactionsApi } from '@shared/api'
import React from 'react'

import { Comment } from './comment.component'
import { CommentSend } from './comment-send.component'

interface IComments {
  postId: number
}
export const Comments = (props: IComments) => {
  const { postId } = props
  const [isOpen, setIsOpen] = React.useState(false)

  const {
    comments,
    isFetching: commentsLoading,
    getComments,
  } = useGetCommentsByPostId({ postId })

  const [send, { data }] = reactionsApi.useCreateCommentMutation()

  React.useEffect(() => {
    getComments()
  }, [data])

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
        {comments.length > 0
          ? comments.map((comment) => <Comment comment={comment} key={comment.id} />)
          : 'There is no comments yet...'}
        {commentsLoading && (
          <div
            className={`p-4 rounded-[1rem] bg-overlay-1-solid animate-pulse w-[100%] mb-4`}
          >
            loading...
          </div>
        )}
        <CommentSend send={send} postId={postId} />
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
