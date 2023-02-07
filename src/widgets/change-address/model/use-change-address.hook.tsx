import { AuthHelper } from '@entities/user'
import { useAuth } from '@features/auth'
import { isWhitelisted } from '@shared/lib'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export const useChangeAddress = () => {
  const { address } = useAccount()

  const [previousAddress, setPreviousAddress] = useState(address)

  const router = useRouter()

  const { login } = useAuth()
  useEffect(() => {
    
    if (address && !isWhitelisted(address)) {
      router.push('/user-not-whitelisted')
      return
    }

    if (previousAddress !== address) {
      setPreviousAddress(address)
      ;(async () => {
        await login()
      })()
    }
  }, [address])
}
