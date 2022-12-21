import { AuthButton } from '@features/auth'
import { Meta, MetamaskError } from '@shared/ui'
import { useEthers } from '@usedapp/core'
import { useEffect, useState } from 'react'
import { useCheckAndChangeChainId } from 'src/blockchain'

export default function AuthPage() {
  const [isNoMetamask, setIsNoMetamask] = useState(false)
  const { chainId } = useEthers()
  const checkAndChangeChainId = useCheckAndChangeChainId()

  useEffect(() => {
    ;(async () => {
      await checkAndChangeChainId(setIsNoMetamask)
    })()
  }, [chainId, checkAndChangeChainId])

  return (
    <>
      <Meta title="frenly" description="log in page" />

      <MetamaskError show={isNoMetamask} />
      <div className="container flex flex-col items-center h-screen bg-frenly-light">
        <div className="flex flex-1 flex-col items-center justify-center">
          <img src="/assets/icons/eyesLogo.svg" alt="eyes" className="w-48 h-48" />
          <h1 className="text-6xl font-rounded text-heading font-bold mt-4">
            welcome, fren
          </h1>
        </div>

        <div className="w-full px-4 pt-8 pb-4 bg-white border-black border-2 rounded-[2.5rem] mb-8">
          <h2 className="font-rounded font-semibold text-4xl text-heading mb-4">
            ur wallet = ur profile
          </h2>
          <p className="text-text font-text font-regular mb-8">
            on frenly (and on web3 in general) ur wallet is ur profile, so for using
            frenly you need to connect the ethereum wallet.
          </p>
          <AuthButton />
        </div>
      </div>
    </>
  )
}
