import React from 'react'

import type { IComment } from '../model'
import { useGetCommentsByPostId } from '../model'
import { Comment } from './comment.component'

interface ICommentListProperties {
  publicationId: string
}

export const CommentList = React.memo((props: ICommentListProperties) => {
  const { publicationId } = props
  const { comments, commentValue, setCommentValue } = useGetCommentsByPostId({
    publicationId,
  })

  return (
    <div className="flex flex-col py-4 relative pl-14">
      <h4 className="text-xl font-bold mb-4">Comments</h4>
      {comments?.map((comment: IComment) => {
        return <Comment key={comment.profileId + comment.createdAt} {...comment} />
      })}
      <div className="w-full pt-4 pb-4 flex">
        <div className="flex rounded-2xl bg-light-gray px-4 py-2 w-full mr-2">
          <input
            style={{ background: 'transparent' }}
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            type="text"
            className="outline-none w-full"
            placeholder="Comment"
          />
        </div>
        <button
          // onClick={commentHandler}
          className="flex items-center justify-center py-1 px-2"
        >
          <img src="/assets/icons/send-icon.svg" alt="messages" />
        </button>
      </div>
    </div>
  )
})
