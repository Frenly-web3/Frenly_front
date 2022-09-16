import { useMutation, useQuery } from '@apollo/client'
import styles from '@pages/auth/auth.module.scss'
import { login } from '@store/lens/auth/login-user'
import { CREATE_PROFILE } from '@store/lens/create-profile.mutation'
import { GET_DEFAULT_PROFILES } from '@store/lens/get-profile.query'
import { checkAndChangeChainId } from '@store/utils/blockchain'
import { useEthers } from '@usedapp/core'
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

  // @ts-ignore
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
    <div className={styles.auth}>
      <div className={styles.content}>
        <div className={styles.buttons}>
          {!account && (
            <button onClick={connectWallet} className={styles.buttonRegistration}>
              Connect wallet
            </button>
          )}
          {!isAuth && account && (
            <button onClick={signUp} className={styles.buttonRegistration}>
              SignUp
            </button>
          )}
          {!isAuth && account && (
            <button onClick={signIn} className={styles.buttonRegistration}>
              SignIn
            </button>
          )}
          {account && (
            <button onClick={createProfileHandler} className={styles.buttonRegistration}>
              Create Profile
            </button>
          )}
          {isAuth && !haveLensProfile && (
            <button className={styles.buttonRegistration}> Buy Lens Profile </button>
          )}
        </div>
      </div>
    </div>
  )
}
