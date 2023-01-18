import { communityApi } from '@shared/api'

interface IProperties {
  id: string
}

export const useCommunityInfo = (props: IProperties) => {
  const { id } = props

  const [fetch, { data, isLoading, isError }] =
    communityApi.useLazyGetCommunityInfoQuery()

  const getCommunity = () => {
    fetch({ id })
  }

  return {
    getCommunity,
    data,
    isLoading,
    isError,
  }
}
