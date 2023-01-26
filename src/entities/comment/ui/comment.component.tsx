// eslint-disable-next-line boundaries/element-types
import { Avatar, Name } from '@entities/user'
import { formatFancyDate } from '@shared/lib'
import Link from 'next/link'

import type { IComment } from '../model'

interface IProperies {
  comment: IComment
}
export const Comment = (props: IProperies) => {
  const { comment } = props
  const profileLink = `/profile/${comment.creator.walletAddress}`

  return (
    <div className="flex gap-2">
      <Link href={profileLink}>
        <Avatar className={'w-8 h-8'} address={comment.creator.walletAddress} />
      </Link>
      <div>
        <Link href={profileLink}>
          <Name
            className={'mt-[-.25rem] font-rounded font-medium'}
            address={comment.creator.walletAddress}
          />
        </Link>
        <div className="font-text text-sm text-hidden mt-[-.25rem]">
          {formatFancyDate(new Date(comment.creationDate))}
        </div>
        <div>{comment.description}</div>
      </div>
    </div>
  )
}
