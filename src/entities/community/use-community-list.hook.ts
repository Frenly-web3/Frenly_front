import { communityApi } from '@shared/api'

export const useCommunityList = () => {
  const { data, isLoading, isError } = communityApi.useGetCommunityListQuery({})

  return {
    data,
    isLoading,
    isError,
  }
}
