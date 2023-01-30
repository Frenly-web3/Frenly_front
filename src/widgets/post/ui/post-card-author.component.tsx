import { Author } from '@entities/user'
import Link from 'next/link'

import { usePostCardContext } from '../model'

export function PostCardAuthor() {
  const { creationDate, ownerAddress } = usePostCardContext()

  return (
    <div className="px-4">
      <Link href={`/profile/${ownerAddress}`}>
        <Author address={ownerAddress} date={creationDate} />
      </Link>
    </div>
  )
}
