import { Author } from '@entities/user'
import { useGetENSByAddress } from '@shared/lib'

import { usePostCardContext } from '../model'

export function PostCardAuthor() {
  const {
    creatorAvatar,
    // creatorUsername,
    creatorAddress,
    date,
    // creatorLensId,
    // fromMirrorName,
    // mirrorFromId,
    // isMirror,
    isLoading,
  } = usePostCardContext()
  const creatorENSUsername = useGetENSByAddress({ address: creatorAddress })

  return (
    <Author
      avatar={creatorAvatar as string}
      name={creatorENSUsername || creatorAddress}
      profileId={creatorAddress as string}
      date={date as string}
      // fromMirror={fromMirrorName as string}
      // fromMirrorId={mirrorFromId as string}
      // isMirror={isMirror}
      isLoading={isLoading}
    />
  )
}
