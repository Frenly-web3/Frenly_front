import type { IAddress } from '@shared/lib'
import { isAddress, isEnsName } from '@shared/lib'
import { useMemo } from 'react'
import { useEnsAddress } from 'wagmi'

export const useGetAddressFrom = ({ value }: { value: IAddress | string }) => {
  const { data: ensAddress } = useEnsAddress({
    name: value,
  })
  return useMemo(() => {
    if (isAddress(value)) {
      return value
    }
    if (isEnsName(value)) {
      return ensAddress
    }
    return null
  }, [ensAddress, value])
}
