import { reactionsApi } from '@shared/api'

import type { IComment } from './comment.entity'

interface IUseGetCommentsByPostIdProperties {
  postId: number
}

export const useGetCommentsByPostId = (props: IUseGetCommentsByPostIdProperties) => {
  const { postId } = props
  const [fetch, { data: reactions, isLoading, isError }] =
    reactionsApi.useLazyPostReactionsQuery()
  const { comments }: { comments: IComment[] } = reactions || { comments: [] }

  const getComments = () => {
    fetch({ postId })
  }

  return { getComments, comments, isLoading, isError }
}
