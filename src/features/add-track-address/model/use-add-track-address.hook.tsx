import { adminApi } from '@shared/api'
import { useLoaderContext } from '@shared/lib'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

export const useAddTrackAddress = () => {
  const [address, setAddress] = useState('')
  const { setIsLoading } = useLoaderContext()

  const [addUserForTrack] = adminApi.useAddUserForTrackMutation()

  const addTrackAddress = useCallback(async () => {
    try {
      setIsLoading(true)
      await addUserForTrack({ address })
      toast.success('Address successfully added for track')
    } catch (error) {
      // @ts-ignore
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [address])

  return {
    address,
    setAddress,
    addTrackAddress,
  }
}
