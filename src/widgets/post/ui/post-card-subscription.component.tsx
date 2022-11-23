import React from 'react'

import { usePostCardContext } from '../model'

interface IPostCardSubscriptionProperties {}

export const PostCardSubscription = (props: IPostCardSubscriptionProperties) => {
  const {} = props
  const { nameCollection } = usePostCardContext()
  return (
    <div className="text-sm font-normal text-gray-darker mt-1 pl-14">
      {nameCollection}
    </div>
  )
}
