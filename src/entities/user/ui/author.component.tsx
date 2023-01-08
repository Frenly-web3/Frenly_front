import { TimeDate } from '@shared/ui'
import { useRouter } from 'next/router'
import React from 'react'
import { useEnsAvatar, useEnsName } from 'wagmi'

// import { useUpdate } from '../header/use-update-user.hook'

interface IAuthorProperties {
  avatar: string
  name: string
  date: string
  profileId: string
  // fromMirror?: string
  // fromMirrorId?: string
  // isMirror: boolean | null
  isLoading?: boolean
}

export function Author(props: IAuthorProperties) {
  const {
    // avatar,
    name,
    profileId,
    // fromMirror, fromMirrorId, isMirror,
    // isLoading,
    date,
  } = props

  const {
    data: ensAvatar,
    // isLoading: avatarLoading
  } = useEnsAvatar({
    address: profileId as `0x${string}`,
  })

  const { data: ensName, isLoading: nameLoading } = useEnsName({
    address: profileId as `0x${string}`,
  })

  const router = useRouter()
  const routeToProfile = ({ idProfile }: { idProfile: string }) => {
    router.push(`/profile/${idProfile}`)
  }

  const shortAddress = `0x${profileId.slice(2, 6)}...${profileId.slice(
    -4,
    profileId.length
  )}`

  // const avatarUnification = useUnificationFormatImage({
  //   image: { url: avatar, type: 'image' },
  // })

  return (
    <figure className="flex items-center  gap-2 px-4">
      <button
        onClick={() => routeToProfile({ idProfile: profileId })}
        className="flex items-center border rounded-full border-border-color overflow-hidden"
      >
        <img
          src={ensAvatar || '/assets/images/temp-avatar.png'}
          alt={name}
          className={`w-10 h-10`}
        />
      </button>

      {/* {avatarUnification ? (
        <button
          onClick={() => routeToProfile({ idProfile: profileId })}
          className="flex items-center border rounded-full border-border-color overflow-hidden"
        >
          <img
            src={avatarUnification.url.toString()}
            alt={name}
            className={`w-10 h-10`}
          />
        </button>
      ) : (
        <>
          {isLoading ? (
            <div className="flex w-10 h-10 items-center bg-gray-darker rounded-full overflow-hidden animate-pulse"></div>
          ) : (
            <img
              src={'/assets/images/temp-avatar.png'}
              alt={name}
              className="flex items-center border rounded-full border-border-color overflow-hidden w-10 h-10"
            />
          )}
        </>
      )} */}

      <div className="flex flex-col">
        <figcaption>
          <div
            className={`text-heading font-rounded font-medium cursor-pointer mb-[-0.25rem] ${
              nameLoading && 'animate-pulse'
            }`}
            onClick={() => routeToProfile({ idProfile: profileId })}
          >
            {ensName || shortAddress}
          </div>

          {/* {name ? (
            <div
              className="text-heading font-rounded font-medium cursor-pointer mb-[-0.25rem]"
              onClick={() => routeToProfile({ idProfile: profileId })}
            >
              {name.slice(0, 2) === '0x'
                ? `0x${name.slice(2, 6)}...${name.slice(-4, name.length)}`
                : name}
            </div>
          ) : (
            <div className="mt-4 w-28 h-3 rounded-full bg-gray animate-pulse"></div>
          )} */}
          {/* {isMirror &&
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
          ))} */}
        </figcaption>
        <div className="font-text text-hidden font-regular text-sm">
          {date && <TimeDate date={date} />}
        </div>
      </div>
    </figure>
  )
}
