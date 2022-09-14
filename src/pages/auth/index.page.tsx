import { useQuery } from '@apollo/client'
import styles from '@pages/auth/auth.module.scss'
import { GET_DEFAULT_PROFILES } from '@store/lens/get-profile.query'
import { checkAndChangeChainId } from '@store/utils/blockchain'
import { useEthers } from '@usedapp/core'
import React, { useEffect, useState } from 'react'

export default function AuthPage() {
  const [isAuth] = useState<boolean>(false)
  const [haveLensProfile] = useState<boolean>(false)

  const { activateBrowserWallet, account, chainId } = useEthers()
  // const [createProfile, data] = useMutation(CREATE_PROFILE)

  const profile = useQuery(GET_DEFAULT_PROFILES, {
    variables: {
      request: {
        ethereumAddress: account,
      },
    },
  })
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

  const signIn = async () => {}

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
          {isAuth && !haveLensProfile && (
            <button className={styles.buttonRegistration}> Buy Lens Profile </button>
          )}
        </div>
      </div>
    </div>
  )
}
