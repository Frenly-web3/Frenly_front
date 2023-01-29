import { revertInitialState, setAuth, setTokens } from '@entities/user'
import { authApi } from '@shared/api'
import { isWhitelisted, useAppDispatch } from '@shared/lib'
import React from 'react'
import { useAccount, useConnect, useSignMessage } from 'wagmi'

export function useAuth() {
  const { address } = useAccount()
  const [loginMutation] = authApi.useValidateUserSignatureMutation()
  const [getNonce] = authApi.useLazyGetUserNonceQuery()
  const setAuthDispatch = useAppDispatch(setAuth)
  const setTokensDispatch = useAppDispatch(setTokens)
  const deleteTokensDispatch = useAppDispatch(revertInitialState)
  const { signMessageAsync } = useSignMessage()
  const { connectAsync, connectors } = useConnect()

  const [isLoading, setIsLoading] = React.useState(false)
  const [isError, setIsError] = React.useState<false | string>(false)

  const login = React.useCallback(async () => {
    setIsLoading(true)
    if (address && !isWhitelisted(address)) {
      return
    }

    try {
      const account =
        // eslint-disable-next-line unicorn/no-await-expression-member
        address || (await connectAsync({ connector: connectors[0] })).account

      const { data: nonce } = await getNonce({ address: account })

      if (nonce) {
        const signature = await signMessageAsync({ message: `Nonce: ${nonce.nonce}` })

        const loginResponse = await loginMutation({
          address: address!,
          signature,
        })

        if ('data' in loginResponse) {
          const { data: tokens } = loginResponse

          setAuthDispatch({ isAuth: true })
          setTokensDispatch({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          })
          setIsLoading(false)
        }
      }
    } catch (error: any) {
      console.log(error)

      setIsError(error.message)
    }
  }, [
    address,
    connectAsync,
    connectors,
    getNonce,
    loginMutation,
    setAuthDispatch,
    setTokensDispatch,
    signMessageAsync,
  ])

  const logout = React.useCallback(() => {
    deleteTokensDispatch()
  }, [deleteTokensDispatch])

  return { login, logout, isLoading, isError }
}
