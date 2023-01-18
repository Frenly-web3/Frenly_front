import { usePostLike } from '../model'

interface IProperties {
  postId: number
}

export const PostLikeButton = (props: IProperties) => {
  const { postId } = props
  const { isError, isLiked, likeUnlike, count } = usePostLike({ postId })

  return (
    <>
      <style jsx>{`
        .icon {
          font-variation-settings: 'FILL' ${isLiked ? 1 : 0}, 'wght' 400, 'GRAD' 0,
            'opsz' 24;
        }
      `}</style>
      <button
        onClick={likeUnlike}
        className={`${
          isLiked ? 'bg-error text-white' : 'bg-overlay-1-solid text-text'
        } px-2 max-w-fit cursor-pointer flex items-center gap-1 transition-colors rounded-full`}
      >
        <div className="font-icon leading-4 icon">favorite</div>
        {count < 0 ? 0 : count}
      </button>
    </>
  )
}
