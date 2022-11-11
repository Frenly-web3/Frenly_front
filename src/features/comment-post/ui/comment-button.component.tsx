import { IconButton } from '@shared/ui'
import React from 'react'

import { useCommentPost } from '../model'

interface ICommentButton {
  publicationId: string
  setIsOpenComment: (state: boolean) => void
  isOpenComment: boolean
}
export const CommentButton = (props: ICommentButton) => {
  const { publicationId, setIsOpenComment, isOpenComment } = props
  const { amountComments } = useCommentPost({ publicationId })
  return (
    <div>
      <IconButton
        image="/assets/icons/message.svg"
        amount={amountComments}
        onClick={() => {
          setIsOpenComment(!isOpenComment)
        }}
      />
    </div>
  )
}
