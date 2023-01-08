import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

interface IBackButtonComponentProperties {
  onClick: () => void
}

export const BackButtonComponent = (props: IBackButtonComponentProperties) => {
  const {
    // onClick
  } = props
  const router = useRouter()

  return (
    <button onClick={() => router.back()} className="flex items-center mr-4">
      <Image src="/assets/icons/arrow-back.svg" alt="back" width={10} height={19} />
    </button>
  )
}
