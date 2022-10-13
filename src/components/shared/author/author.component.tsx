import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import { useUpdate } from '../header/use-update-user.hook'

interface IAuthorProperties {
  avatar: string
  name: string
  date: string
  profileId: string
  fromMirror?: string
}

export default function Author(props: IAuthorProperties) {
  const { avatar, name, date, profileId, fromMirror } = props
  const { name: username } = useUpdate(fromMirror || '')
  const router = useRouter()
  return (
    <figure className="flex items-center">
      <button
        onClick={() => router.push(`/profile/${profileId}`)}
        className="mr-4 flex items-center border rounded-full border-border-color overflow-hidden"
      >
        <img src={avatar} alt={name} className={`w-10 h-10`} />
      </button>

      <figcaption>
        <div className="text-base font-semibold">{name}</div>
        {fromMirror !== undefined && (
          <div className="text-base font-normal">
            🪞 mirrored from{' '}
            <span className="font-bold">{username === null ? fromMirror : username}</span>
          </div>
        )}
        <div className="text-base font-normal text-gray">{date}</div>
      </figcaption>
    </figure>
  )
}
