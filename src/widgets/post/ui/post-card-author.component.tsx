import { Author } from '@entities/user'

import { usePostCardContext } from '../model'

export function PostCardAuthor() {
  const { creatorAddress, date } = usePostCardContext()

  return <Author address={creatorAddress} date={date!} />
}
