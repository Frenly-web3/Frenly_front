import { PostContent } from '@entities/post'
import type { NetworkEnum, PostTypeEnum } from '@shared/lib'
import { SellerTypeEnum } from '@shared/lib'

import { usePostCardContext } from '../model'

export function PostCardContent() {
  const {
    image,
    contractAddress,
    creatorAddress,
    date,
    from,
    postType,
    network,
    to,
    sellerType,
  } = usePostCardContext()
  return (
    <>
      {sellerType == SellerTypeEnum.NftTransfer && (
        <PostContent
          image={image as null}
          blockchainType={network as NetworkEnum}
          contractAddress={contractAddress as string}
          creatorAddress={creatorAddress as string}
          date={date as string}
          from={from as string}
          itemType={'nft'}
          messageType={postType as PostTypeEnum}
          mirrorDescription={'' as string}
          showAuthor={true}
          showDate={true}
          to={to as string}
          isMirror={false}
        />
      )}
    </>
  )
}
