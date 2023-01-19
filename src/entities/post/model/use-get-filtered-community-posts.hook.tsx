import { contentApi } from '@shared/api'
import { NetworkEnum, PostTypeEnum, SIZE_POST_CHUNK, TokenTypeEnum } from '@shared/lib'
import { useEffect, useMemo, useState } from 'react'

import { convertTransferTypeToEnum } from '../lib'
import type { IPost } from './post.entity'

interface IProperties {
  communityId: number | string
}

export const useGetCommunityPosts = (props: IProperties) => {
  const { communityId } = props
  const [takeCount, setTakeCount] = useState(0)

  const { data: postsData, isSuccess } = contentApi.useGetCommunityFeedQuery({
    communityId,
    take: SIZE_POST_CHUNK,
    skip: SIZE_POST_CHUNK * takeCount,
  })

  const [postsSum, setPostsSum] = useState<IPost[]>([])
  const [hasMore, setHasMore] = useState(true)

  const reloadPosts = () => {
    setPostsSum([])
    setTakeCount(0)
  }

  const postsWithoutZeroX = postsData
    ?.filter((el: any) => {
      return el.postType === 0
    })
    .filter((el: any) => {
      return !el.isMirror
    })

  useEffect(() => {
    if (!postsData) {
      return
    }
    const posts: IPost[] = postsWithoutZeroX!.map((post: any): IPost => {
      const {
        transferType,
        id: idBack,
        image,
        transactionHash,
        creationDate,
        fromAddress,
        toAddress,
        contractAddress,
        postType,
      } = post

      return {
        date: creationDate,
        from: fromAddress,
        network: NetworkEnum.Ethereum,
        postType: convertTransferTypeToEnum(transferType),
        to: toAddress,
        txHash: transactionHash,
        id: idBack,
        image: `${process.env.NEXT_PUBLIC_API_URL}token-images/${image}`,
        contractAddress,
        creatorAddress:
          convertTransferTypeToEnum(transferType) === PostTypeEnum.Send
            ? fromAddress
            : toAddress,
        nameCollection: '',
        sellerType: postType,
        tokenId: '',
        tokenType: TokenTypeEnum.ERC721,
        price: null,
        signedObject: null,
      }
    })
    if (posts?.length === 0) {
      setHasMore(false)
    }
    if (posts) {
      setPostsSum((previous) => [
        ...previous,
        ...posts.filter((post) => Object.keys(post).length > 0),
      ])
    }
  }, [postsData, postsWithoutZeroX])

  return useMemo(
    () => ({
      posts: postsSum,
      isSuccess,
      hasMore,
      refetchFilteredFeed: reloadPosts,
      setTakeCount,
    }),
    [hasMore, isSuccess, postsSum]
  )
}
