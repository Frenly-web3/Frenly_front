import { communityApi } from '@shared/api'

export const useCommunityList = () => {
  const [fetch, { data, isLoading, isError }] =
    communityApi.useLazyGetCommunityListQuery()

  const getCommunityList = () => {
    fetch({})
  }

  return {
    getCommunityList,
    data,
    isLoading,
    isError,
  }
}
