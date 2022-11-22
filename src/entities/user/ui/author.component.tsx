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
  isMirror: boolean | null
}

export function Author(props: IAuthorProperties) {
  const { avatar, name, profileId, fromMirror, fromMirrorId, isMirror } = props

  const router = useRouter()
  const routeToProfile = ({ idProfile }: { idProfile: string }) => {
    router.push(`/profile/${idProfile}`)
  }
  return (
    <figure className="flex items-center">
      {avatar && avatar !== '/assets/images/temp-avatar.png' ? (
        <button
          onClick={() => routeToProfile({ idProfile: profileId })}
          className="mr-4 flex items-center border rounded-full border-border-color overflow-hidden"
        >
          <img src={avatar} alt={name} className={`w-10 h-10`} />
        </button>
      ) : (
        <div className="mr-4 flex w-10 h-10 items-center bg-gray-darker rounded-full overflow-hidden animate-pulse"></div>
      )}

      <figcaption>
        {name ? (
          <div
            className="text-base font-semibold cursor-pointer"
            onClick={() => routeToProfile({ idProfile: profileId })}
          >
            {name}
          </div>
        ) : (
          <div className="mt-4 w-28 h-3 rounded-full bg-gray animate-pulse"></div>
        )}
        {isMirror &&
          isMirror !== null &&
          (fromMirror ? (
            <div className="text-base font-normal">
              🪞 mirrored from{' '}
              <span
                onClick={() => routeToProfile({ idProfile: fromMirrorId as string })}
                className="font-bold cursor-pointer"
              >
                {fromMirror}
              </span>
            </div>
          ) : (
            <div className="m-auto mt-4 w-52 h-3 rounded-full bg-gray animate-pulse"></div>
          ))}
      </figcaption>
    </figure>
  )
}
