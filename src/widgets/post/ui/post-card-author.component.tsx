import { Author } from '@entities/user'

import { usePostCardContext } from '../model'

export function PostCardAuthor() {
  const {
    creatorAvatar,
    creatorUsername,
    creatorAddress,
    date,
    // creatorLensId,
    // fromMirrorName,
    // mirrorFromId,
    // isMirror,
    isLoading,
  } = usePostCardContext()

  return (
    <Author
      avatar={creatorAvatar as string}
      name={
        creatorUsername !== null
          ? creatorUsername
          : `frenly.${creatorAddress?.slice(0, 9)}`
      }
      profileId={creatorAddress as string}
      date={date as string}
      // fromMirror={fromMirrorName as string}
      // fromMirrorId={mirrorFromId as string}
      // isMirror={isMirror}
      isLoading={isLoading}
    />
  )
}
