import { Author } from '@entities/user'
import Link from 'next/link'

import { usePostCardContext } from '../model'

export function PostCardAuthor() {
  const { creationDate, ownerAddress } = usePostCardContext()

  return (
    <Link href={`/profile/${ownerAddress}`}>
      <Author address={ownerAddress} date={creationDate} />
    </Link>
  )
}
