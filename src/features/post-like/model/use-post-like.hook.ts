import { reactionsApi } from '@shared/api'
import React from 'react'

interface IProperties {
  postId: number
}

export const usePostLike = (props: IProperties) => {
  const { postId } = props
  const { data: isInitLiked, isError: initLikedError } = reactionsApi.useIsPostLikedQuery(
    { postId }
  )
  const { data: reactions, isError: reactionsError } = reactionsApi.usePostReactionsQuery(
    { postId }
  )
  const [likeUnlikeMutation, { isError: likeUnlikeError }] =
    reactionsApi.usePostLikeUnlikeMutation()

  const [isLiked, setIsLiked] = React.useState(false)
  const [likesCount, setLikesCount] = React.useState(0)

  React.useEffect(() => {
    if (isInitLiked) setIsLiked(isInitLiked)
  }, [isInitLiked])

  React.useEffect(() => {
    if (reactions) setLikesCount(reactions.likes)
  }, [reactions])

  const likeUnlike = () => {
    likeUnlikeMutation({ postId })
    setIsLiked((previous) => !previous)
    setLikesCount((previous) => (isLiked ? previous - 1 : previous + 1))
  }

  return {
    likeUnlike,
    isLiked,
    count: likesCount,
    isError: {
      reactions: reactionsError,
      isLiked: initLikedError,
      mutation: likeUnlikeError,
    },
  }
}
