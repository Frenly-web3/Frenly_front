import type { IComment } from '@entities/comment'
import { Comment } from '@entities/comment'
import React from 'react'

interface ICommentListProperties {
  comments: IComment[]
}
export const CommentList = React.memo((props: ICommentListProperties) => {
  const { comments } = props
  console.log(comments)

  return (
    <div className="flex flex-col py-4 relative pl-14">
      <h4 className="text-xl font-bold mb-4">Comments</h4>
      {comments?.map((comment: IComment) => {
        return <Comment key={comment.profileId + comment.createdAt} {...comment} />
      })}
    </div>
  )
})
