import { PostContent } from '@entities/post'
import type { NetworkEnum, PostTypeEnum } from '@shared/lib'
import { SellerTypeEnum, useCheckIsAdmin } from '@shared/lib'
import { memo } from 'react'
import { useBlockchain } from 'src/blockchain'

import { usePostCardContext } from '../model'
import { ExecutedOrderContent } from './executed-order-content.component'

export const PostCardContent = memo(() => {
  const {
    image,
    contractAddress,
    creatorAddress,
    date,
    from,
    postType,
    network,
    // mirrorDescription,
    to,
    // isMirror,
    sellerType,
  } = usePostCardContext()

  const { account } = useBlockchain()
  const isAdmin = useCheckIsAdmin({ address: account as string })

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
          isAdmin={isAdmin}
          itemType={'nft'}
          messageType={postType as PostTypeEnum}
          // mirrorDescription={mirrorDescription as string}
          mirrorDescription={'' as string}
          showAuthor={true}
          showDate={true}
          to={to as string}
          // isMirror={isMirror}
          isMirror={false}
        />
      )}
      {(sellerType == SellerTypeEnum.BuyEvent ||
        sellerType == SellerTypeEnum.SellEvent) && (
        <ExecutedOrderContent
          addressFrom={from as string}
          addressTo={to as string}
          sellerType={sellerType}
        />
      )}
      {sellerType == SellerTypeEnum.SellOrder && (
        <div className="text-text">🖼️ my NFT is on sale via frenly</div>
      )}
    </>
  )
})
