import type { IPost } from '@entities/post'
import { useGetNftsByUser } from '@entities/post'
import { CreateOrderForm } from '@features/create-order'
import type { TokenTypeEnum } from '@shared/lib'
import { Meta } from '@shared/ui'
import { PostCard } from '@widgets/post'
import { UserProfileWidget } from '@widgets/user-profile'
import React, { useState } from 'react'
import { useBlockchain, useGetWalletProfileId } from 'src/blockchain'

export default function NftsPage() {
  const { account } = useBlockchain()

  const viewerProfileId = useGetWalletProfileId(account as string)

  const [chosenPost, setChosenPost] = useState<IPost | null>(null)

  const { nftPosts } = useGetNftsByUser({
    profileId: viewerProfileId,
    profileAddress: account as string,
  })
  return (
    <div className="relative h-screen">
      <Meta title={'My NFT`s'} description="Your NFT`s" />
      <div className="container">
        <UserProfileWidget profileId={viewerProfileId as string} />
        <div className="grid grid-cols-2 gap-1">
          {nftPosts?.map((post) => {
            return (
              <div
                key={post.image}
                className="cursor-pointer"
                onClick={() => setChosenPost(post)}
              >
                <PostCard {...post}>
                  <PostCard.Image />
                  <PostCard.Subscription />
                </PostCard>
              </div>
            )
          })}
        </div>
      </div>
      <CreateOrderForm
        tokenId={chosenPost?.tokenId as string}
        contractAddress={chosenPost?.contractAddress as string}
        tokenType={chosenPost?.tokenType as TokenTypeEnum}
        image={chosenPost?.image as string}
        nameCollection={chosenPost?.nameCollection as string}
        show={chosenPost !== null}
        closeForm={() => setChosenPost(null)}
      />
    </div>
  )
}
