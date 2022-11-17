import { Author } from '@entities/user'

import { usePostCardContext } from '../model'

export function PostCardAuthor() {
  const {
    creatorAvatar,
    creatorUsername,
    creatorAddress,
    date,
    creatorLensId,
    fromMirrorName,
    mirrorFromId,
    isMirror,
  } = usePostCardContext()

  return (
    <Author
      avatar={
        creatorAvatar && creatorAvatar !== null
          ? `${process.env.NEXT_PUBLIC_API_URL}avatars/${creatorAvatar}`
          : '/assets/images/temp-avatar.png'
      }
      name={
        creatorUsername !== null
          ? creatorUsername
          : `frenly.${creatorAddress?.slice(0, 9)}`
      }
      profileId={creatorLensId as string}
      date={date as string}
      fromMirror={fromMirrorName as string}
      fromMirrorId={mirrorFromId as string}
      isMirror={isMirror as boolean}
    />
  )
}
