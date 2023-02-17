import { reactionsApi } from '@shared/api'

interface IUseGetCommentsByPostIdProperties {
  postId: number
}

export const useGetCommentsByPostId = (props: IUseGetCommentsByPostIdProperties) => {
  const { postId } = props

  const [fetch, { data, isError, isFetching }] = reactionsApi.useLazyGetCommentsByIdQuery()

  const getComments = () => {
    fetch({ postId })
  }

  return { getComments, data, isFetching, isError }
}
