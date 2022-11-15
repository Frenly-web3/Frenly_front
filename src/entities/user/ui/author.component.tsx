import { useRouter } from 'next/router'
import React from 'react'

// import { useUpdate } from '../header/use-update-user.hook'

interface IAuthorProperties {
  avatar: string
  name: string
  date: string
  profileId: string
  fromMirror?: string
  fromMirrorId?: string
}

export function Author(props: IAuthorProperties) {
  const { avatar, name, profileId, fromMirror, fromMirrorId } = props

  const router = useRouter()
  const routeToProfile = ({ idProfile }: { idProfile: string }) => {
    router.push(`/profile/${idProfile}`)
  }

  return (
    <figure className="flex items-center">
      <button
        onClick={() => routeToProfile({ idProfile: profileId })}
        className="mr-4 flex items-center border rounded-full border-border-color overflow-hidden"
      >
        <img src={avatar} alt={name} className={`w-10 h-10`} />
      </button>

      <figcaption>
        <div
          className="text-base font-semibold cursor-pointer"
          onClick={() => routeToProfile({ idProfile: profileId })}
        >
          {name}
        </div>
        {fromMirror && (
          <div className="text-base font-normal">
            🪞 mirrored from{' '}
            <span
              onClick={() => routeToProfile({ idProfile: fromMirrorId as string })}
              className="font-bold cursor-pointer"
            >
              {fromMirror}
            </span>
          </div>
        )}
      </figcaption>
    </figure>
  )
}
