import { IconButton } from '@shared/ui'

import { useLikePost } from '../model'

interface ILikeButton {
  publicationId: string
}

export const LikeButton = (props: ILikeButton) => {
  const { publicationId } = props

  const { isLiking, likeUnlikePost, amountLikes } = useLikePost({ publicationId })
  const likePostHandler = () => {
    likeUnlikePost()
  }
  return (
    <>
      <IconButton
        disabled={isLiking}
        onClick={likePostHandler}
        image="/assets/icons/heart.svg"
        amount={amountLikes}
      />
    </>
  )
}
