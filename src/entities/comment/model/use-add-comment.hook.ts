import { reactionsApi } from '@shared/api'

export const useAddComment = () => {
  const [addComment, { isError, isLoading, isSuccess }] =
    reactionsApi.useCreateCommentMutation()
  return {}
}
