import { contentApi, useGetLensPublications } from '@shared/api'
import { NetworkEnum } from '@shared/lib'
import { useEffect, useMemo, useState } from 'react'

import { convertTransferTypeToEnum } from '../lib'
import type { IPost } from './post.entity'

interface IGetFilteredPosts {
  posts: IPost[]
  isSuccess: boolean
  lensIsLoading: boolean
  hasMore: boolean
  refetchFilteredFeed: () => void
}

export const useGetFilteredPosts = ({
  take,
  skip,
}: {
  take: number
  skip: number
}): IGetFilteredPosts => {
  const {
    data: postsData,
    isSuccess,
    refetch: refetchFilteredFeed,
  } = contentApi.useGetFilteredFeedQuery({
    take,
    skip,
  })

  const [postsSum, setPostsSum] = useState<IPost[]>([])
  const { data: lensPosts, loading: lensIsLoading } = useGetLensPublications(postsData)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (!postsData) {
      return
    }
    if (!lensPosts && lensIsLoading) {
      return
    }
    const posts: IPost[] = postsData?.map((post: any): IPost => {
      // const { profile, metadata, createdAt, id, mirrorOf, stats } = post
      const {
        isMirror,
        mirrorDescription,
        transferType,
        id: idBack,
        image,
        transactionHash,
        creationDate,
        fromAddress,
        toAddress,
        // lensId,
        contractAddress,
        lensId,
      } = post

      const postLens = lensPosts?.publications?.items?.find((el: any) => {
        return lensId == el?.id
      })
      if (!postLens) {
        return {} as IPost
      }
      const { profile, mirrorOf, metadata } = postLens
      return {
        creatorLensId: profile?.id,
        date: creationDate,
        from: fromAddress,
        isMirror,
        mirrorDescription,
        mirrorFrom: isMirror ? mirrorOf?.profile?.ownedBy : null,
        mirrorFromId: isMirror ? mirrorOf?.profile?.id : null,
        network:
          metadata?.attributes[7]?.value == 'ETHEREUM'
            ? NetworkEnum.Ethereum
            : NetworkEnum.Polygon,
        postType: convertTransferTypeToEnum(transferType),
        to: toAddress,
        txHash: transactionHash,
        lensId,
        id: idBack,
        image,
        contractAddress,
        creatorAddress: profile?.ownedBy,
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
  }, [postsData, lensPosts, lensIsLoading])

  return useMemo(
    () => ({ posts: postsSum, lensIsLoading, isSuccess, hasMore, refetchFilteredFeed }),
    [hasMore, isSuccess, lensIsLoading, postsSum]
  )
}
