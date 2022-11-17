import { PostContent } from '@entities/post'
import type { NetworkEnum, PostTypeEnum } from '@shared/lib'
import { useCheckIsAdmin } from '@shared/lib'
import { useBlockchain } from 'src/blockchain'

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
    mirrorDescription,
    to,
    isMirror,
  } = usePostCardContext()

  const { account } = useBlockchain()
  const isAdmin = useCheckIsAdmin({ address: account as string })

  return (
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
      mirrorDescription={mirrorDescription as string}
      showAuthor={true}
      showDate={true}
      to={to as string}
      isMirror={isMirror}
    />
  )
}
