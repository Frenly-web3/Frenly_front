import { useAuthContext, userSelector } from '@entities/user'
import { AuthButton } from '@features/auth'
import { isWhitelisted } from '@shared/lib'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useAccount } from 'wagmi'

const Index = () => {
  const { address } = useAccount()
  const router = useRouter()
  const user = useSelector(userSelector)

  const { isAuth } = useAuthContext()

  if (address && isWhitelisted(address) && user.isAuth) router.push('/feed')
  return (
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
  )
}

export default Index
