import Image from 'next/image'
import React from 'react'

interface IAuthorProperties {
  avatar: string
  name: string
  date: string
}

export default function Author(props: IAuthorProperties) {
  const { avatar, name, date } = props
  return (
    <figure className="flex items-center">
      <div className="mr-4 flex items-center border rounded-full border-border-color overflow-hidden">
        <Image src={avatar} alt={name} width={40} height={40} />
      </div>

      <figcaption>
        <div className="text-base font-semibold">{name}</div>
        <div className="text-base font-normal text-gray">{date}</div>
      </figcaption>
    </figure>
  )
}
