import React from 'react'

import { useCommentPost } from '../model'

interface ICommentSendProperties {
  publicationId: string
  setComments: ({ content }: { content: string }) => void
}

export const CommentSend = (props: ICommentSendProperties) => {
  const { publicationId, setComments } = props
  const { commentPost, comment, setComment } = useCommentPost({
    publicationId,
    setComments,
  })

  return (
    <div className="w-full pt-4 pb-4 flex py-4 relative pl-14">
      <div className="flex rounded-2xl bg-light-gray px-4 py-2 w-full mr-2">
        <input
          style={{ background: 'transparent' }}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Comment"
        />
      </div>
      <button
        onClick={() => commentPost({ comment })}
        className="flex items-center justify-center py-1 px-2"
      >
        <img src="/assets/icons/send-icon.svg" alt="messages" />
      </button>
    </div>
  )
}
