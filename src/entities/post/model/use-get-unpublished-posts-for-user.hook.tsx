import { adminApi, contentApi } from '@shared/api'
import { NetworkEnum, RoleEnum } from '@shared/lib'
import { SIZE_POST_CHUNK } from '@shared/lib/constants'
import { useEffect, useMemo, useState } from 'react'
import { useBlockchain, useGetWalletProfileId } from 'src/blockchain'

import { convertTransferTypeToEnum } from '../lib'
import type { IPost } from './post.entity'

interface IGetUnpublishedPostsForUserInput {
  profileId: string
  skipReq: boolean
  role: RoleEnum
}

interface IGetPublishedContentForUserOutput {
  posts: IPost[]
  getMorePosts: () => void
  hasMore: boolean
  setZeroPosts: () => void
}

export const useGetUnpublishedPostsForUser = ({
  profileId,
  skipReq,
  role,
}: IGetUnpublishedPostsForUserInput): IGetPublishedContentForUserOutput => {
  const [takeCount, setTakeCount] = useState(0)
  const [mappedPosts, setMappedPosts] = useState<IPost[]>([])
  const [hasMore, setHasMore] = useState(true)
  const { data: unpublishedPosts, isLoading: isLoadingUser } =
    contentApi.useGetUnpublishedContentQuery(
      { take: SIZE_POST_CHUNK, skip: SIZE_POST_CHUNK * takeCount },
      { skip: skipReq || role !== RoleEnum?.User }
    )

  const { data: unpublishedPostsAdmin, isLoading: isLoadingAdmin } =
    adminApi.useGetUnpublishedPostQuery(
      { take: SIZE_POST_CHUNK, skip: SIZE_POST_CHUNK * takeCount },
      {
        skip: skipReq || role !== RoleEnum?.Admin,
      }
    )

  const { account } = useBlockchain()
  const viewerProfileId = useGetWalletProfileId(account as string)

  const getMorePosts = () => {
    setTakeCount((previous) => previous + 1)
  }
  const setZeroPosts = () => {
    setTakeCount(0)
    setMappedPosts([])
    setHasMore(true)
  }

  console.log(mappedPosts)
  const posts = role !== RoleEnum.User ? unpublishedPostsAdmin : unpublishedPosts
  const isLoading = role !== RoleEnum.User ? isLoadingAdmin : isLoadingUser
  useEffect(() => {
    setHasMore(true)
    console.log('asdasd', posts)

    const mappedPost = posts?.map((post: any): IPost => {
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
      return {
        creatorLensId: viewerProfileId,
        date: creationDate,
        from: fromAddress,
        isMirror,
        mirrorDescription,
        mirrorFrom: null,
        mirrorFromId: null,
        network: NetworkEnum.Ethereum,
        postType: convertTransferTypeToEnum(transferType),
        to: toAddress,
        txHash: transactionHash,
        lensId,
        id: idBack,
        image,
        contractAddress,
        creatorAddress: account as string,
      }
    })
    console.log(mappedPost)

    if (mappedPost?.length == 0) {
      setHasMore(false)
    }

    if (posts) {
      setMappedPosts((previous) => [...previous, ...mappedPost])
    }
  }, [posts, isLoading])

  return useMemo(
    () => ({
      posts: mappedPosts,
      getMorePosts,
      hasMore,
      setZeroPosts,
    }),
    [mappedPosts, hasMore]
  )
}
