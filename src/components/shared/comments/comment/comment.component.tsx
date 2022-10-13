import { useUpdate } from '@components/shared/header/use-update-user.hook'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

export interface IComment {
  metadata: any
  profile: any
  createdAt: string
  id: string
}

const Comment = ({ metadata, profile, createdAt }: IComment) => {
  const commentDate = moment(createdAt).fromNow(true)
  const router = useRouter()
  const { name: username, avatar } = useUpdate(profile.ownedBy)
  return (
    <figure className="flex items-center mb-2">
      <div className="mr-4 flex items-center border rounded-full border-border-color overflow-hidden self-start">
        <img
          src={
            avatar && avatar !== null
              ? `${process.env.NEXT_PUBLIC_API_URL}avatars/${avatar}`
              : '/assets/images/temp-avatar.png'
          }
          onClick={() => {
            router.push(`profile/${profile.id}`)
          }}
          className={`cursor-pointer w-7 h-7`}
          alt={username === null ? profile.handle : username}
        />
      </div>

      <figcaption className="w-full border-b-[1px] border-border-color pb-4">
        <div className="flex justify-between">
          <div
            onClick={() => {
              router.push(`profile/${profile.id}`)
            }}
            className={`cursor-pointer text-base font-semibold`}
          >
            {username === null ? profile.handle : username}
          </div>
          <div className="text-sm text-gray">{commentDate}</div>
        </div>
        <div className="text-base font-normal text-gray">{metadata.content}</div>
      </figcaption>
    </figure>
  )
}

export default Comment
