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
      <div className="container flex flex-col items-center h-screen pb-8">
        <div className="flex flex-1 flex-col items-center justify-center">
          <img src="/assets/icons/eyesLogo.svg" alt="eyes" className="w-32 h-32" />
          <h1 className="text-6xl font-rounded text-heading font-bold mt-16">frenly</h1>
          <h2 className="text-hidden text-center mt-3 font-text text-lg">
            Web3 social network <br /> built for you, not advertisers
          </h2>
        </div>

        <AuthButton />
      </div>
    </>
  )
}
