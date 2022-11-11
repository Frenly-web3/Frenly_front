import { userApi } from '@shared/api'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'

import type { IComment } from '../model'

interface ICommentProperties extends IComment {}

export const Comment = ({
  description,
  createdAt,
  profileId,
  address,
}: ICommentProperties) => {
  const commentDate = moment(createdAt).fromNow(true)
  const router = useRouter()
  const { data: userInfo } = userApi.useGetUserInfoQuery({ address })

  return (
    <figure className="flex items-center mb-2">
      <div className="mr-4 flex items-center border rounded-full border-border-color overflow-hidden self-start">
        <img
          src={
            userInfo?.avatar !== null
              ? `${process.env.NEXT_PUBLIC_API_URL}avatars/${userInfo?.avatar}`
              : '/assets/images/temp-avatar.png'
          }
          onClick={() => {
            router.push(`profile/${profileId}`)
          }}
          className={`cursor-pointer w-7 h-7`}
          alt={userInfo?.avatar}
        />
      </div>

      <figcaption className="w-full border-b-[1px] border-border-color pb-4">
        <div className="flex justify-between">
          <div
            onClick={() => {
              router.push(`profile/${profileId}`)
            }}
            className={`cursor-pointer text-base font-semibold`}
          >
            {userInfo?.username}
          </div>
          <div className="text-sm text-gray">{commentDate}</div>
        </div>
        <div className="text-base font-normal text-gray break-words">{description}</div>
      </figcaption>
    </figure>
  )
}
