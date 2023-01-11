import type { IComment } from '@entities/comment'
import { useEnsAvatar, useEnsName } from 'wagmi'

interface IProperties {
  comment: IComment
}

export const Comment = (props: IProperties) => {
  const { comment } = props

  const { data: avatar, isLoading: avatarLoading } = useEnsAvatar({
    address: comment.creator.walletAddress as `0x${string}`,
  })
  const { data: name, isLoading: nameLoading } = useEnsName({
    address: comment.creator.walletAddress as `0x${string}`,
  })

  return (
    <div className={`flex gap-[.5rem] mb-[1rem]`}>
      <a href={`/profile/${comment.creator.walletAddress}`}>
        {avatar ? (
          <img src={avatar} alt="" className={`w-[3rem] h-[3rem] rounded-full`} />
        ) : (
          <div
            className={`w-[3rem] h-[3rem] rounded-full bg-overlay-1-solid ${
              avatarLoading && 'animate-pulse'
            }`}
          />
        )}
      </a>
      <div className={`flex flex-col gap-[0rem]`}>
        <a
          href={`/profile/${comment.creator.walletAddress}`}
          className={`${nameLoading && 'animate-pulse'}`}
        >
          {name || comment.creator.walletAddress}
        </a>
        <div className={`mb-[.25rem] text-xs text-hidden`}>{`${new Date(
          comment.updateDate
        ).toLocaleDateString()} at ${new Date(comment.updateDate)
          .toLocaleTimeString()
          .slice(0, 5)}`}</div>
        <div className={``}>{comment.description}</div>
      </div>
    </div>
  )
}
