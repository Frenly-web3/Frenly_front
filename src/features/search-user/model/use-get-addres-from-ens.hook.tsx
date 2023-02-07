import type { IAddress } from '@shared/lib'
import { isAddress, isEnsName } from '@shared/lib'
import { useMemo } from 'react'
import { useEnsAddress } from 'wagmi'

export const useGetAddressFrom = ({ value }: { value: IAddress | string }) => {
  const { data: ensAddress, isFetching } = useEnsAddress({
    name: value,
  })
  return useMemo(() => {
    if (isAddress(value.toLowerCase())) {
      return { address: value, isLoading: false }
    }
    if (isEnsName(value.toLowerCase())) {
      return { address: ensAddress, isLoading: isFetching }
    }
    return { address: null, isLoading: false }
  }, [ensAddress, isFetching, value])
}
