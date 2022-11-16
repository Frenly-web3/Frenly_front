import { useGetLensPublicationsForUser } from '@shared/api'
import { NetworkEnum } from '@shared/lib'
import { useEffect, useState } from 'react'

import { convertTransferTypeToEnum } from '../lib'
import type { IPost } from './post.entity'

interface IGetPublishedContentForUserInput {
  profileId: string
  skip: boolean
}
interface IGetPublishedContentForUserOutput {
  publishedPosts: IPost[]
  fetchMorePosts: any
  hasMore: boolean
  setZeroPosts: () => void
}

export const useGetPublishedContentForUser = ({
  profileId,
  skip = true,
}: IGetPublishedContentForUserInput): IGetPublishedContentForUserOutput => {
  // if (skip) {
  //   return {} as IGetPublishedContentForUserOutput
  // }
  const [cursor, setCursor] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [posts, setPosts] = useState<IPost[]>([])

  const { data: publicationsForUser, loading } = useGetLensPublicationsForUser({
    profileId,
    cursor,
    skip,
  })

  const fetchMorePosts = () => {
    setCursor(publicationsForUser?.publications?.pageInfo?.next)
  }

  const setZeroPosts = () => {
    setCursor(null)
    setPosts([])
    setHasMore(true)
  }

  console.log(publicationsForUser?.publications?.pageInfo)

  useEffect(() => {
    const publishedPosts = publicationsForUser?.publications?.items?.map(
      (el: any): IPost => {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { id, metadata, mirrorOf, profile, __typename } = el
        return {
          creatorLensId: profile?.id,
          date: metadata?.attributes[6]?.value,
          from: metadata?.attributes[4]?.value,
          isMirror: __typename === 'Mirror',
          mirrorDescription: '',
          mirrorFrom: __typename === 'Mirror' ? mirrorOf?.profile?.ownedBy : null,
          mirrorFromId: __typename === 'Mirror' ? mirrorOf?.profile?.id : null,
          network:
            metadata?.attributes[7]?.value == 'ETHEREUM'
              ? NetworkEnum.Ethereum
              : NetworkEnum.Polygon,
          postType: convertTransferTypeToEnum(metadata?.attributes[5]?.value),
          to: metadata?.attributes[3]?.value,
          txHash: metadata?.attributes[8]?.value,
          lensId: id,
          id: null,
          image: metadata?.attributes[9]?.value,
          contractAddress: metadata?.attributes[1]?.value,
          creatorAddress: profile?.ownedBy,
        }
      }
    )
    if (publishedPosts?.length === 0) {
      setHasMore(false)
    }
    if (publishedPosts) {
      setPosts((previous) => [...previous, ...publishedPosts])
    }
  }, [publicationsForUser, loading])

  return {
    publishedPosts: posts,
    fetchMorePosts,
    hasMore,
    setZeroPosts,
  }
}
