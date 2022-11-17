import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

export const BackButtonComponent = () => {
  const router = useRouter()
  return (
    <button onClick={() => router.push('/feed')} className="flex items-center mr-4">
      <Image src="/assets/icons/arrow-back.svg" alt="back" width={10} height={19} />
    </button>
  )
}
