import { UserModelService } from '@entities/user'
import {
  authApi,
  useCreateProfileLens,
  useIsHaveDispatcher,
  useSetDispatcherTypedData,
} from '@shared/api'
import { useAppDispatch } from '@shared/lib'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import {
  useBlockchain,
  useGetWalletProfileId,
  useSetDispatcherWithSig,
  useSignMessage,
  useSignTypedData,
  useSplitSignature,
} from 'src/blockchain'

import { getChallenge, loginLensMutation } from '../api'

export function useAuth() {
  const { account } = useBlockchain()
  const [loginMutation] = authApi.useValidateUserSignatureMutation()
  const [getNonce] = authApi.useLazyGetUserNonceQuery()
  const [hasLensProfile] = authApi.useLazyHasLanceProfileQuery()
  const setLensAuthDispatch = useAppDispatch(UserModelService.actions.setLensAuth)
  const setAuthDispatch = useAppDispatch(UserModelService.actions.setAuth)
  const setTokensDispatch = useAppDispatch(UserModelService.actions.setTokens)
  const setTokensLensDispatch = useAppDispatch(UserModelService.actions.setTokensLens)
  const deleteTokensDispatch = useAppDispatch(UserModelService.actions.revertInitialState)
  const { createProfileLens } = useCreateProfileLens()
  const profileId = useGetWalletProfileId(account as string)
  const { setDispatcherTypedData } = useSetDispatcherTypedData()
  const signMessage = useSignMessage()
  const signTypedData = useSignTypedData()
  const splitSignature = useSplitSignature()
  const { send: setDispatcherWithSig } = useSetDispatcherWithSig()
  const { isHaveDispatcher } = useIsHaveDispatcher()

  const loginLens = useCallback(async () => {
    try {
      const challengeData = await getChallenge(account as string)

      const { challenge } = challengeData.data

      if (challenge) {
        const signature = await signMessage(challenge.text)
        const dataTokens = await loginLensMutation({
          address: account as string,
          signature: signature as string,
        })

        const { accessToken, refreshToken } = dataTokens.data.authenticate

        setLensAuthDispatch({ isLensAuth: true })
        setTokensLensDispatch({
          accessTokenLens: accessToken,
          refreshTokenLens: refreshToken,
        })
      }
    } catch (error) {
      throw new Error(String(error))
    }
  }, [account, setLensAuthDispatch, setTokensLensDispatch, signMessage])

  const login = useCallback(async () => {
    try {
      const nonceData = await getNonce({ address: account as string })

      const { nonce } = nonceData.data.data

      if (nonce) {
        const signature = await signMessage(`Nonce: ${nonce}`)

        const dataTokens = await loginMutation({
          address: account as string,
          signature: signature as string,
        })

        // @ts-ignore
        const { accessToken, refreshToken } = dataTokens.data.data

        setAuthDispatch({ isAuth: true })
        setTokensDispatch({ accessToken, refreshToken })
      }
    } catch (error) {
      throw new Error(String(error))
    }
  }, [account, getNonce, loginMutation, setAuthDispatch, setTokensDispatch, signMessage])

  const createProfile = useCallback(async () => {
    await createProfileLens({ account: account as string })
  }, [account])

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

  const logout = useCallback(async () => {
    deleteTokensDispatch()
  }, [deleteTokensDispatch])

  const hasProfile = useCallback(
    async (address: string) => {
      const response = await hasLensProfile({ address })
      return response.data.data
    },
    [hasLensProfile]
  )

  return { login, loginLens, logout, hasProfile, createProfile, enableDispatcher }
}
