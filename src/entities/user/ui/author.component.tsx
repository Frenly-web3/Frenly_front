import { useRouter } from 'next/router'
import React from 'react'

// import { useUpdate } from '../header/use-update-user.hook'

interface IAuthorProperties {
  avatar: string
  name: string
  date: string
  profileId: string
  fromMirror?: string
}

export function Author(props: IAuthorProperties) {
  const { avatar, name, profileId, fromMirror } = props

  const router = useRouter()
  const routeToProfile = () => {
    router.push(`/profile/${profileId}`)
  }

  return (
    <figure className="flex items-center">
      <button
        onClick={routeToProfile}
        className="mr-4 flex items-center border rounded-full border-border-color overflow-hidden"
      >
        <img src={avatar} alt={name} className={`w-10 h-10`} />
      </button>

      <figcaption>
        <div className="text-base font-semibold" onClick={routeToProfile}>
          {name}
        </div>
        {fromMirror && (
          <div className="text-base font-normal">
            🪞 mirrored from <span className="font-bold">{fromMirror}</span>
          </div>
        )}
      </figcaption>
    </figure>
  )
}
