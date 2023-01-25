import { Comment } from '@entities/comment'
import type { Dispatch, SetStateAction } from 'react'
import React from 'react'

import { usePostReactionContext } from '../model'
import { PostCommentAdd } from './post-comment-add.component'

interface IProperties {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  isOpen: boolean
}

export const PostCommentList = (props: IProperties) => {
  const { setIsOpen, isOpen } = props
  const { comments, addComment, isError } = usePostReactionContext()!.comments

  return (
    <>
      {(isError.mutation || isError.reactions) && 'something went wrong'}
      {isOpen && (
        <>
          <div className="flex flex-col gap-4 mt-4">
            {comments.map((comment, index) => {
              return <Comment key={`${comment.id}_${index}`} comment={comment} />
            })}
            <PostCommentAdd addComment={addComment} />
          </div>
          <button
            className="w-full p-2 bg-overlay-1-solid mt-4 rounded-[.5rem]"
            onClick={() => setIsOpen(false)}
          >
            Hide comments
          </button>
        </>
      )}
    </>
  )
}
