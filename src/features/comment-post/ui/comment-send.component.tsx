import React from 'react'

interface ICommentSendProperties {
  postId: number
  send: Function
}

export const CommentSend = (props: ICommentSendProperties) => {
  const { postId, send } = props
  const [newComment, setNewComment] = React.useState('')

  const handlerSend = () => {
    send({
      postId,
      comment: newComment,
    })
    setNewComment('')
  }

  return (
    <div className={`flex w-full gap-2 mb-4`}>
      <input
        placeholder="a nice frenly comment..."
        className={`flex-1 bg-overlay-1-solid px-4 py-2 focus:outline-none rounded-xl`}
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handlerSend} className={`bg-main px-4 py-2 text-white rounded-xl`}>
        Send
      </button>
    </div>
  )
}
