import { reactionsApi } from '@shared/api'
import React from 'react'

interface ILikeButton {
  postId: number
}

export const LikeButton = (props: ILikeButton) => {
  const { postId } = props

  const [isLiking, setIsLiking] = React.useState(false)
  const [countLikes, setCountLikes] = React.useState(0)

  const [getIsLiked, { data: isLiked }] = reactionsApi.useLazyIsPostLikedQuery()
  const [getLikes, { data: reactions }] = reactionsApi.useLazyPostReactionsQuery()
  const [likeUnlike] = reactionsApi.usePostLikeMutation()

  React.useEffect(() => {
    getIsLiked({ postId })
    getLikes({ postId })

    if (isLiked && reactions) {
      setIsLiking(isLiked)
      setCountLikes(reactions.likes)
    }
  }, [getIsLiked, getLikes, isLiked, postId, reactions])

  const likePostHandler = () => {
    setIsLiking((previous) => !previous)
    setCountLikes((previous) => (isLiking ? previous - 1 : previous + 1))
    likeUnlike({ postId })
    getIsLiked({ postId })
    getLikes({ postId })
  }

  return (
    <>
      <style jsx>{`
        .icon {
          font-variation-settings: 'FILL' ${isLiking ? 1 : 0}, 'wght' 400, 'GRAD' 0,
            'opsz' 24;
        }
      `}</style>
      <div
        onClick={likePostHandler}
        className={`${
          isLiking ? 'bg-error text-white' : 'bg-overlay-1-solid text-text'
        } px-2 max-w-fit cursor-pointer flex items-center gap-1 transition-colors rounded-full`}
      >
        {countLikes < 0 ? 0 : countLikes}
        <div className="font-icon leading-4 icon">favorite</div>
      </div>
    </>
  )
}
