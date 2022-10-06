import { useMutation, useQuery } from '@apollo/client'
import { Meta } from '@components/meta/meta.component'
import {
  authApi,
  useGetNonceQuery,
  useHasLanceProfileQuery,
  useLoginMutation,
} from '@store/auth/auth.api'
import { setTokens } from '@store/auth/auth.slice'
import { login } from '@store/lens/auth/login-user'
import { CREATE_PROFILE } from '@store/lens/create-profile.mutation'
import { GET_DEFAULT_PROFILES } from '@store/lens/get-profile.query'
import { useAppDispatch } from '@store/store.hook'
import { checkAndChangeChainId } from '@store/utils/blockchain'
import { useEthers } from '@usedapp/core'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useHaveProfile } from 'src/contract/lens-hub.api'

export default function AuthPage() {
  const [isAuth] = useState<boolean>(false)
  const [haveLensProfile] = useState<boolean>(false)
  const [isReloadProfile, reloadProfile] = useState(false)
  const { account, chainId, library, activateBrowserWallet } = useEthers()
  const dataHasLens = useHasLanceProfileQuery(account || '', { skip: !account })
  // const [createProfile, data] = useMutation(CREATE_PROFILE)
  // const profile = useQuery(GET_DEFAULT_PROFILES, {
  //   variables: {
  //     request: {
  //       ethereumAddress: account,
  //     },
  //   },
  // })

  const { data: dataNonce } = useGetNonceQuery(account || '', { skip: !account })

  // @ts-ignore
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_PROFILE)

  const dispatch = useAppDispatch()
  const [triggerLogin] = useLoginMutation()
  const countProfile = useHaveProfile(account || '')

  useEffect(() => {
    ;(async () => {
      await checkAndChangeChainId()
    })()
  }, [chainId])

  const router = useRouter()

  const connectWallet = async () => {
    await activateBrowserWallet()
  }

  const createProfileHandler = async () => {
    if (account) {
      mutateFunction({
        variables: {
          request: {
            handle: `frenly${account.toLowerCase().slice(0, 10)}`,
            profilePictureUri: null,
            followModule: {
              freeFollowModule: true,
            },
          },
        },
      })
    }
  }

  // const signUp = async () => {}
  console.log(dataHasLens)
  const signIn = async () => {
    let dataLogin
    if (account) {
      const nonce = dataNonce?.data?.nonce

      if (nonce) {
        console.log(nonce)

        const signature = await library?.getSigner().signMessage(`Nonce: ${nonce}`)
        dataLogin = await triggerLogin({ address: account, signature: signature || '' }).unwrap()
      }
      console.log(dataLogin)
      // @ts-ignore
      dispatch(setTokens({ ...dataLogin?.data }))
      console.log('AaA', account, library)

      await login(account, library)

      if (Number(countProfile) < 1) {
        await createProfileHandler()
      }

      reloadProfile(true)
      router.push('/feed')
    }
  }

  return (
    <>
      <Meta title="Frenly" description="Log In Page" />

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
              onClick={signIn}
              className="w-full rounded-xl bg-main text-white text-lg py-3 mb-4 font-semibold"
            >
              SignIn
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
