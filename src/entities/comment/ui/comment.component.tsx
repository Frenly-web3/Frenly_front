// eslint-disable-next-line boundaries/element-types
import { Avatar, Name } from '@entities/user'
import { formatFancyDate } from '@shared/lib'

import type { IComment } from '../model'

interface IProperies {
  comment: IComment
}

export const Comment = (props: IProperies) => {
  const { comment } = props

  return (
    <div className="flex gap-2">
      <Avatar className={'w-8 h-8'} address={comment.creator.walletAddress} />
      <div>
        <Name className={''} address={comment.creator.walletAddress} />
        <div className="font-compact text-sm text-hidden mt-[-.25rem]">
          {formatFancyDate(new Date(comment.creationDate))}
        </div>
        <div>{comment.description}</div>
      </div>
    </div>
  )
}
