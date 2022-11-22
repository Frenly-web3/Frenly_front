import Image from 'next/image'
import React from 'react'

interface IBackButtonComponentProperties {
  onClick: () => void
}

export const BackButtonComponent = (props: IBackButtonComponentProperties) => {
  const { onClick } = props

  return (
    <button onClick={onClick} className="flex items-center mr-4">
      <Image src="/assets/icons/arrow-back.svg" alt="back" width={10} height={19} />
    </button>
  )
}
