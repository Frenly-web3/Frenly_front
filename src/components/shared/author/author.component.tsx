import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

interface IAuthorProperties {
  avatar: string
  name: string
  date: string
  profileId: string
}

export default function Author(props: IAuthorProperties) {
  const { avatar, name, date, profileId } = props
  const router = useRouter()
  return (
    <figure className="flex items-center">
      <button
        onClick={() => router.push(`/profile/${profileId}`)}
        className="mr-4 flex items-center border rounded-full border-border-color overflow-hidden"
      >
        <Image src={avatar} alt={name} width={40} height={40} />
      </button>

      <figcaption>
        <div className="text-base font-semibold">{name}</div>
        <div className="text-base font-normal text-gray">{date}</div>
      </figcaption>
    </figure>
  )
}
