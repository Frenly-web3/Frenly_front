import { IconButton } from '@shared/ui'

import { useLikePost } from '../model'

interface ILikeButton {
  publicationId: string
}

export const LikeButton = (props: ILikeButton) => {
  const { publicationId } = props

  const { isLiking, likeUnlikePost, amountLikes, liked } = useLikePost({ publicationId })
  const likePostHandler = () => {
    likeUnlikePost()
  }
  return (
    <div
      className={`rounded-2xl ${liked && 'bg-is-liked'} ${isLiking && 'bg-light-gray'}`}
    >
      <IconButton
        disabled={isLiking}
        onClick={likePostHandler}
        image="/assets/icons/heart.svg"
        amount={amountLikes}
      />
    </div>
  )
}
