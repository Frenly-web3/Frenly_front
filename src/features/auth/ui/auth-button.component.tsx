import { Button } from '@shared/ui'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useBlockchain } from 'src/blockchain'

import { useAuth } from '../model'

type Properties = {}

export const AuthButton = (props: Properties) => {
  const { account, activateBrowserWallet } = useBlockchain()
  const { login, loginLens, logout, hasProfile, createProfileLens } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  console.log(isLoading)

  const signUpHandle = async () => {
    try {
      setIsLoading(true)
      await login()
      await loginLens()

      const hasLensProfile = await hasProfile(account as string)

      if (!hasLensProfile) {
        await createProfileLens()
      }

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
