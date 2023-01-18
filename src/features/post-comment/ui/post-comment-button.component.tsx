import type { Dispatch, SetStateAction } from 'react'

import { usePostComment } from '../model'

interface IProperties {
  postId: number
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const PostCommentButton = (props: IProperties) => {
  const { postId, setIsOpen } = props
  const { comments } = usePostComment({ postId })

  return (
    <>
      <style jsx>{`
        .icon {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
      <button
        onClick={() => setIsOpen((previous) => !previous)}
        className={`bg-overlay-1-solid text-text px-2 max-w-fit cursor-pointer flex items-center gap-1 transition-colors rounded-full`}
      >
        <div className="font-icon leading-4 icon">chat</div>
        {comments.length}
      </button>
    </>
  )
}
