import { communityApi } from '@shared/api'

interface IProperties {
  id: string
}

export const useCommunityInfo = (props: IProperties) => {
  const { id } = props

  const { data, isLoading, isError } = communityApi.useGetCommunityInfoQuery({ id })

  return {
    data,
    isLoading,
    isError,
  }
}
