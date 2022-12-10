import { useLoaderContext } from '@shared/lib'
import { Button } from '@shared/ui'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'
import { useBlockchain } from 'src/blockchain'

import { useAuth } from '../model'

interface IAuthButtonProperties {}

export const AuthButton = (props: IAuthButtonProperties) => {
  const {} = props

  const { account, activateBrowserWallet } = useBlockchain()
  const {
    login,
    // loginLens,
    logout,
    //  hasProfile, createProfile
  } = useAuth()
  const { setIsLoading } = useLoaderContext()
  const router = useRouter()

  const signUpHandle = async () => {
    try {
      setIsLoading(true)
      await activateBrowserWallet()
      await login()
      if (account && !process.env.NEXT_PUBLIC_WHITELIST?.includes(account?.toLowerCase())) {
        router.push('/user-not-whitelised')
        return;
      }
      toast.success('You successfully authorized on Frenly')
      // await loginLens()
      // toast.success('You successfully authorized on Lens')
      // const hasLensProfile = await hasProfile(account as string)

      // if (!hasLensProfile) {
      //   await createProfile()
      // }

      // await enableDispatcher()

      router.push('/feed')
    } catch (error) {
      await logout()
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const connectWalletHandler = async () => {
    try {
      setIsLoading(true)
      await activateBrowserWallet()
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="w-full py-4 mb-16">
      {!account ? (
        <Button onClick={connectWalletHandler}>Connect wallet</Button>
      ) : (
        <Button onClick={signUpHandle}>Sign Up</Button>
      )}
    </div>
  )
}
