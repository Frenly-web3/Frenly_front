import { useLocalStorage } from '@mantine/hooks'
import { useAppDispatch } from '@shared/lib'
import { createContext, useContext, useMemo, useState } from 'react'
import { useAccount } from 'wagmi'

import { AuthHelper } from './lib'
import { setAuth } from './user.slice'

export interface IAuthContext {
  isAuth: boolean | undefined
}

export const AuthContext = createContext<IAuthContext>({
  isAuth: undefined,
})

export const AuthContextProvider = ({ children }: any) => {
  const [isAuth, setIsAuth] = useState<boolean | undefined>()
  const [token] = useLocalStorage({ key: 'access-token' })
  const setAuthDispatch = useAppDispatch(setAuth)
  const { address } = useAccount()
  // const {} = authApi.
  const internalValue: IAuthContext = useMemo(() => {
    setAuthDispatch({
      isAuth:
        !AuthHelper.isExpired({ token }) &&
        AuthHelper.decodeJwt({ token })?.walletAddress === address?.toLowerCase(),
    })
    return {
      isAuth:
        !AuthHelper.isExpired({ token }) &&
        AuthHelper.decodeJwt({ token })?.walletAddress === address?.toLowerCase(),
    }
  }, [address, token])
  return <AuthContext.Provider value={internalValue}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
