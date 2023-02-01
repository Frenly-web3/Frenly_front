import { PostContent } from '@entities/post'
import type { IAddress, NetworkEnum } from '@shared/lib'

import { usePostCardContext } from '../model'

export function PostCardContent() {
  const { actions, ownerAddress, creationDate, transferType } = usePostCardContext()
  return (
    <div className="px-4">
      <PostContent
        blockchainType={actions[0]?.blockchainType as NetworkEnum}
        contractAddress={actions[0]?.contractAddress as IAddress}
        creatorAddress={ownerAddress}
        date={creationDate}
        from={actions[0]?.fromAddress as IAddress}
        itemType={'nft'}
        messageType={transferType}
        mirrorDescription={'' as string}
        showAuthor={true}
        showDate={true}
        to={actions[0]?.toAddress as IAddress}
        isMirror={false}
      />
    </div>
  )
}
