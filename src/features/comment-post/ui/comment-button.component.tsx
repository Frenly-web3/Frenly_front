import { IconButton } from '@shared/ui'
import React from 'react'

interface ICommentButton {
  publicationId: string
  setIsOpenComment: (state: boolean) => void
  isOpenComment: boolean
  amountComments: number
}
export const CommentButton = (props: ICommentButton) => {
  const { setIsOpenComment, isOpenComment, amountComments } = props

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
