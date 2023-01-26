import { useIsHaveDispatcher, useSetDispatcherTypedData } from '@shared/api'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import {
  useBlockchain,
  useGetWalletProfileId,
  useSetDispatcherWithSig,
  useSignTypedData,
  useSplitSignature,
} from 'src/blockchain'

export const useDispatcherEnable = () => {
  const { account } = useBlockchain()
  const profileId = useGetWalletProfileId(account as string)
  const { setDispatcherTypedData } = useSetDispatcherTypedData()
  const signTypedData = useSignTypedData()
  const splitSignature = useSplitSignature()
  const { send: setDispatcherWithSig } = useSetDispatcherWithSig()
  const { isHaveDispatcher } = useIsHaveDispatcher()

  const enableDispatcher = useCallback(async () => {
    if (!profileId) {
      toast.warn('Profile is creating, try again')
      throw new Error('Profile is creating')
    }
    try {
      const isDispatcher = await isHaveDispatcher({ profileId })

      if (!isDispatcher?.data?.profile?.dispatcher?.canUseRelay) {
        const typedDataResponse = await setDispatcherTypedData({ profileId })

        const typedData = typedDataResponse?.data?.createSetDispatcherTypedData?.typedData

        const signature = await signTypedData({ typedData })

        const { v, r, s } = await splitSignature({ signature: signature as string })

        const { deadline, ...omitTypedData } = typedData.value

        await setDispatcherWithSig({
          ...omitTypedData,
          sig: {
            v,
            r,
            s,
            deadline,
          },
        })
      }
    } catch (error) {
      console.log(error)
    }
  }, [profileId])
  return { enableDispatcher }
}
