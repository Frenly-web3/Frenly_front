import { useMutation, useQuery } from '@apollo/client'
import { Meta } from '@components/meta/meta.component'
import { login } from '@store/lens/auth/login-user'
import { CREATE_PROFILE } from '@store/lens/create-profile.mutation'
import { GET_DEFAULT_PROFILES } from '@store/lens/get-profile.query'
import { checkAndChangeChainId } from '@store/utils/blockchain'
import { useEthers } from '@usedapp/core'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function AuthPage() {
  const [isAuth] = useState<boolean>(false)
  const [haveLensProfile] = useState<boolean>(false)

  const { activateBrowserWallet, account, chainId, library } = useEthers()
  // const [createProfile, data] = useMutation(CREATE_PROFILE)
  const profile = useQuery(GET_DEFAULT_PROFILES, {
    variables: {
      request: {
        ethereumAddress: account,
      },
    },
  })

  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_PROFILE)

  console.log(profile)

  useEffect(() => {
    ;(async () => {
      await checkAndChangeChainId()
    })()
  }, [chainId])

  const connectWallet = async () => {
    await activateBrowserWallet()
  }

  const signUp = async () => {}

  const signIn = async () => {
    if (account) {
      await login(account, library)
    }
  }

  const createProfileHandler = async () => {
    if (account) {
      mutateFunction({
        variables: {
          request: {
            handle: account.toLowerCase().slice(0, 20),
            profilePictureUri: null,
            followModule: null,
          },
        },
      })
    }
  }

  return (
    <>
      <Meta title="Onboarding" description="Log In Page" />

      <div className="container flex flex-col items-center h-screen">
        <div className="flex flex-1 flex-col items-center justify-center">
          <Image src="/assets/images/eyes.gif" alt="eyes" width={85} height={85} />
          <h1 className="text-4xl font-bold mt-16">Frenly</h1>
          <h2 className="text-base text-center mt-3 text-gray">
            Web3 social network <br /> built for you, not advertisers
          </h2>
        </div>

        <div className="w-full py-4 mb-16">
          {!account && (
            <button
              onClick={connectWallet}
              className="w-full rounded-xl bg-main text-white text-lg py-3 font-semibold"
            >
              Connect wallet
            </button>
          )}
          {!isAuth && account && (
            <button
              onClick={signUp}
              className="w-full rounded-xl bg-main text-white text-lg py-3 mb-4 font-semibold"
            >
              SignUp
            </button>
          )}
          {!isAuth && account && (
            <button
              onClick={signIn}
              className="w-full rounded-xl bg-main text-white text-lg py-3 mb-4 font-semibold"
            >
              SignIn
            </button>
          )}
          {account && (
            <button
              onClick={createProfileHandler}
              className="w-full rounded-xl bg-main text-white text-lg py-3 mb-4 font-semibold"
            >
              Create Profile
            </button>
          )}
          {isAuth && !haveLensProfile && (
            <button className="w-full rounded-xl bg-main text-white text-lg py-3 font-semibold">
              Buy Lens Profile
            </button>
          )}
        </div>
      </div>
    </>
  )
}
