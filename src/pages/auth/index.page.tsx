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
      <Meta title="Frenly" description="Log In Page" />

      <MetamaskError show={isNoMetamask} />
      <div className="container flex flex-col items-center h-screen">
        <div className="flex flex-1 flex-col items-center justify-center">
          <img src="/assets/images/eyes.gif" alt="eyes" className="w-20 h-20" />
          <h1 className="text-4xl font-bold mt-16">Frenly</h1>
          <h2 className="text-base text-center mt-3 text-gray">
            Web3 social network <br /> built for you, not advertisers
          </h2>
        </div>

        <AuthButton />
      </div>
    </>
  )
}
