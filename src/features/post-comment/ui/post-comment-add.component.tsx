import React from 'react'

interface IProperies {
  addComment: (description: string) => void
}

export const PostCommentAdd = (props: IProperies) => {
  const { addComment } = props

  const [comment, setComment] = React.useState('')

  const handler = () => {
    addComment(comment)
    setComment('')
  }

  return (
    <>
      <style jsx>{`
        .icon {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
      <div className="flex gap-2">
        <input
          className="flex-1 bg-overlay-1-solid py-2 px-4 leading-4 rounded-[1rem]"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="" type="submit" onClick={handler}>
          <div className="text-main text-2xl font-icon leading-4 icon">send</div>
        </button>
      </div>
    </>
  )
}
