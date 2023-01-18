import type { IAddress } from '@shared/lib'
// eslint-disable-next-line import/no-cycle
import { TimeDate } from '@shared/ui'
import Link from 'next/link'
import React from 'react'

import { Avatar } from './avatar.component'
import { Name } from './name.component'

interface IAuthorProperties {
  date: string
  address: IAddress
}

export const Author = (props: IAuthorProperties) => {
  const { address, date } = props

  return (
    <figure className="flex items-center  gap-2 px-4">
      <Link
        href={`/profile/${address}`}
        className="flex items-center border rounded-full border-border-color overflow-hidden"
      >
        <Avatar className={`w-10 h-10`} address={address} />
      </Link>
      <div className="flex flex-col">
        <figcaption>
          <Name
            className={`font-rounded font-medium cursor-pointer mb-[-0.25rem]`}
            address={address}
          />
        </figcaption>
        <div className="font-text text-hidden font-regular text-sm">
          {date && <TimeDate date={date} />}
        </div>
      </div>
    </figure>
  )
}

export default Author
