// import { contentApi, useGetLensPublicationsForUser } from '@shared/api'
// import { NetworkEnum, SellerTypeEnum, SIZE_POST_CHUNK } from '@shared/lib'
// import { useEffect, useState } from 'react'

// import { convertTransferTypeToEnum } from '../lib'
// import type { IPost } from './post.entity'

// interface IGetPublishedContentForUserInput {
//   profileId: string
//   skip: boolean
// }
// interface IGetPublishedContentForUserOutput {
//   publishedPosts: IPost[]
//   fetchMorePosts: any
//   hasMore: boolean
//   setZeroPosts: () => void
// }

// export const useGetPublishedContentForUser = ({
//   profileId,
//   skip = true,
// }: IGetPublishedContentForUserInput): IGetPublishedContentForUserOutput => {
//   const [cursor, setCursor] = useState<string | null>(null)
//   const [hasMore, setHasMore] = useState(true)
//   const [posts, setPosts] = useState<IPost[]>([])

//   const { data: postsData, isSuccess } = contentApi.useGetPublishedContentQuery({
//     take: SIZE_POST_CHUNK,
//     skip: SIZE_POST_CHUNK * takeCount,
//   })

//   const { data: publicationsForUser, loading } = useGetLensPublicationsForUser({
//     profileId,
//     cursor,
//     skip,
//   })

//   const fetchMorePosts = () => {
//     setCursor(publicationsForUser?.publications?.pageInfo?.next)
//   }

//   const setZeroPosts = () => {
//     setCursor(null)
//     setPosts([])
//     setHasMore(true)
//   }
//   useEffect(() => {
//     setZeroPosts()
//   }, [profileId])

//   useEffect(() => {
//     const publishedPosts = publicationsForUser?.publications?.items?.map(
//       (el: any): IPost => {
//         // eslint-disable-next-line @typescript-eslint/naming-convention
//         const { id, metadata, mirrorOf, profile, __typename } = el
//         return {
//           // creatorLensId: profile?.id,
//           date: metadata?.attributes[6]?.value,
//           from: metadata?.attributes[4]?.value,
//           // isMirror: __typename === 'Mirror',
//           // mirrorDescription: '',
//           // mirrorFrom: __typename === 'Mirror' ? mirrorOf?.profile?.ownedBy : null,
//           // mirrorFromId: __typename === 'Mirror' ? mirrorOf?.profile?.id : null,
//           network:
//             metadata?.attributes[7]?.value == 'ETHEREUM'
//               ? NetworkEnum.Ethereum
//               : NetworkEnum.Polygon,
//           postType: convertTransferTypeToEnum(metadata?.attributes[5]?.value),
//           to: metadata?.attributes[3]?.value,
//           txHash: metadata?.attributes[8]?.value,
//           // lensId: id,
//           id: null,
//           image: `${process.env.NEXT_PUBLIC_API_URL}token-images/${metadata?.attributes[9]?.value}`,
//           contractAddress: metadata?.attributes[1]?.value,
//           creatorAddress: profile?.ownedBy,
//           sellerType: SellerTypeEnum.NftTransfer,
//           nameCollection: null,
//           tokenId: null,
//           tokenType: null,
//           price: null,
//           signedObject: null,
//         }
//       }
//     )
//     if (publishedPosts?.length === 0) {
//       setHasMore(false)
//     }
//     if (publishedPosts) {
//       setPosts((previous) => [...previous, ...publishedPosts])
//     }
//   }, [publicationsForUser, loading, profileId])
//   return {
//     publishedPosts: posts,
//     fetchMorePosts,
//     hasMore,
//     setZeroPosts,
//   }
// }
import { contentApi } from '@shared/api'
import {
  NetworkEnum,
  PostTypeEnum,
  SellerTypeEnum,
  SIZE_POST_CHUNK,
  TokenTypeEnum,
} from '@shared/lib'
import type { Dispatch, SetStateAction } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { convertTransferTypeToEnum } from '../lib'
import type { IPost } from './post.entity'

interface IGetFilteredPosts {
  posts: IPost[]
  isSuccess: boolean
  // lensIsLoading: boolean
  hasMore: boolean
  refetchFilteredFeed: () => void
  setTakeCount: Dispatch<SetStateAction<number>>
}

export const useGetPublishedContentForUser = (id: string): IGetFilteredPosts => {
  const [takeCount, setTakeCount] = useState(0)

  const { data: postsData, isSuccess } = contentApi.useGetPublishedContentQuery({
    take: SIZE_POST_CHUNK,
    skip: SIZE_POST_CHUNK * takeCount,
    id,
  })

  // console.log('useGetPublishedContentForUser', postsData)

  const [postsSum, setPostsSum] = useState<IPost[]>([])
  // const { data: lensPosts, loading: lensIsLoading } = useGetLensPublications(
  //   postsData?.filter((post: any) => {
  //     return !('signedObject' in post)
  //   })
  // )
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

  // console.log('postsWithoutZeroX in useGetPublishedContentForUser', postsWithoutZeroX)
  // eslint-disable-next-line sonarjs/cognitive-complexity
  useEffect(
    () => {
      if (!postsData) {
        return
      }

      // if (!lensPosts && lensIsLoading) {
      //   return
      // }
      const posts: IPost[] = postsWithoutZeroX?.map((post: any): IPost => {
        // const posts: IPost[] = postsData?.map((post: any): IPost => {
        // const { profile, metadata, createdAt, id, mirrorOf, stats } = post
        const {
          // creatorAddress,
          // isMirror,
          // mirrorDescription,
          transferType,
          id: idBack,
          image,
          transactionHash,
          creationDate,
          fromAddress,
          toAddress,
          // lensId,
          contractAddress,
          // lensId,
          // collectionName,
          // sellPrice,
          // signedObject,
          // postType,
        } = post

        // console.log('post', post)
        // const postLens = lensPosts?.publications?.items?.find((el: any) => {
        //   return lensId == el?.id
        // })

        // if (signedObject) {
        //   return {
        //     creatorLensId: null,
        //     date: creationDate,
        //     from: fromAddress,
        //     isMirror: null,
        //     mirrorDescription: null,
        //     mirrorFrom: null,
        //     mirrorFromId: null,
        //     network: NetworkEnum.Ethereum,
        //     postType: null,
        //     to: toAddress,
        //     txHash: null,
        //     lensId: null,
        //     id: idBack,
        //     image,
        //     contractAddress,
        //     creatorAddress: fromAddress,
        //     nameCollection: collectionName,
        //     sellerType: postType,
        //     tokenId: '',
        //     tokenType: TokenTypeEnum.ERC721,
        //     price: sellPrice,
        //     signedObject,
        //   }
        // }

        // if (postType == 2 || postType == 3) {
        //   return {
        //     creatorLensId: null,
        //     date: creationDate,
        //     from: fromAddress,
        //     isMirror: null,
        //     mirrorDescription: null,
        //     mirrorFrom: null,
        //     mirrorFromId: null,
        //     network: NetworkEnum.Ethereum,
        //     postType: null,
        //     to: toAddress,
        //     txHash: null,
        //     lensId: null,
        //     id: idBack,
        //     image,
        //     contractAddress,
        //     creatorAddress: postType === SellerTypeEnum.SellEvent ? fromAddress : toAddress,
        //     nameCollection: collectionName,
        //     sellerType: postType,
        //     tokenId: '',
        //     tokenType: TokenTypeEnum.ERC721,
        //     price: sellPrice,
        //     signedObject,
        //   }
        // }
        // if (!postLens) {
        //   return {} as IPost
        // }
        // const { profile, mirrorOf, metadata } = postLens
        // return {
        //   creatorLensId: profile?.id,
        //   date: creationDate,
        //   from: fromAddress,
        //   isMirror,
        //   mirrorDescription,
        //   mirrorFrom: isMirror ? mirrorOf?.profile?.ownedBy : null,
        //   mirrorFromId: isMirror ? mirrorOf?.profile?.id : null,
        //   network:
        //     metadata?.attributes[7]?.value == 'ETHEREUM'
        //       ? NetworkEnum.Ethereum
        //       : NetworkEnum.Polygon,
        //   postType: convertTransferTypeToEnum(transferType),
        //   to: toAddress,
        //   txHash: transactionHash,
        //   lensId,
        //   id: idBack,
        //   image: `${process.env.NEXT_PUBLIC_API_URL}token-images/${image}`,
        //   contractAddress,
        //   creatorAddress: profile?.ownedBy,
        //   nameCollection: '',
        //   sellerType: postType,
        //   tokenId: '',
        //   tokenType: TokenTypeEnum.ERC721,
        //   price: null,
        //   signedObject: null,
        // }

        return {
          // creatorLensId: profile?.id,
          date: creationDate,
          from: fromAddress,
          // isMirror,
          // mirrorDescription,
          // mirrorFrom: isMirror ? mirrorOf?.profile?.ownedBy : null,
          // mirrorFromId: isMirror ? mirrorOf?.profile?.id : null,
          network: NetworkEnum.Ethereum,
          // metadata?.attributes[7]?.value == 'ETHEREUM'
          //   ? NetworkEnum.Ethereum
          //   : NetworkEnum.Polygon,
          postType: convertTransferTypeToEnum(transferType),
          to: toAddress,
          txHash: transactionHash,
          // lensId,
          id: idBack,
          image: `${process.env.NEXT_PUBLIC_API_URL}token-images/${image}`,
          contractAddress,
          creatorAddress:
            convertTransferTypeToEnum(transferType) === PostTypeEnum.Send
              ? fromAddress
              : toAddress,
          nameCollection: '',
          sellerType: SellerTypeEnum.NftTransfer,
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
    },
    [postsData]
    // [postsData, lensPosts, lensIsLoading]
  )

  return useMemo(
    () => ({
      posts: postsSum,
      // lensIsLoading,
      isSuccess,
      hasMore,
      refetchFilteredFeed: reloadPosts,
      setTakeCount,
    }),
    [
      hasMore,
      isSuccess,
      //  lensIsLoading,
      postsSum,
    ]
  )
}
