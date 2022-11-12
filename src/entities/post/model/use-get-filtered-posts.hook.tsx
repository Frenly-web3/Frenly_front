import { contentApi, useGetLensPublications } from '@shared/api'
import { NetworkEnum } from '@shared/lib'
import { useCallback, useState } from 'react'

import { convertTransferTypeToEnum } from '../lib'
import type { IPost } from './post.entity'

interface IGetFilteredPosts {
  posts: IPost[]
}

export const useGetFilteredPosts = () => {
  const [postsData, setPostsData] = useState<any[]>()

  const [getFilteredFeed] = contentApi.useLazyGetFilteredFeedQuery()
  const backPost = postsData?.filter((el: any) => el.lensId !== null)
  const { data: lensPosts } = useGetLensPublications(backPost)
  return useCallback(
    async ({
      take,
      skip,
    }: {
      take: number
      skip: number
    }): Promise<IGetFilteredPosts> => {
      const data = await getFilteredFeed({ take, skip })
      console.log(data)

      setPostsData(data?.data)

      console.log(postsData)

      const posts = lensPosts?.publications?.items?.map((post: any): IPost => {
        const { profile, metadata, createdAt, id, mirrorOf, stats } = post

        let postBack

        if (backPost) {
          postBack = backPost?.find((el: any) => {
            return el.lensId === id
          })
        }

        const {
          isMirror,
          mirrorDescription,
          transferType,
          id: idBack,
          image,
          transactionHash,
        } = postBack

        return {
          creatorLensId: profile.id,
          date: createdAt,
          from: metadata.attributes[4].value,
          isMirror,
          mirrorDescription,
          mirrorFrom: isMirror ? mirrorOf?.profile?.ownedBy : null,
          network:
            metadata.attributes[7].value == 'ETHEREUM'
              ? NetworkEnum.Ethereum
              : NetworkEnum.Polygon,
          postType: convertTransferTypeToEnum(transferType),
          to: metadata.attributes[3].value,
          totalComments: stats.totalAmountOfComments,
          totalLikes: stats.totalUpvotes,
          totalMirrors: stats.totalAmountOfMirrors,
          txHash: transactionHash,
          lensId: id,
          id: idBack,
          image,
          contractAddress: metadata.attributes[1].value,
          creatorAddress: profile.ownedBy,
        }
      })
      return { posts }
    },
    [backPost, getFilteredFeed, lensPosts?.publications?.items, postsData]
  )
}
