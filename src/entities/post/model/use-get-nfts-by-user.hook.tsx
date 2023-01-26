import { alchemyApi } from '@shared/api'
import { NetworkEnum } from '@shared/lib'

import type { IPost } from './post.entity'

interface IGetNftsByUser {
  profileId: string
  profileAddress: string
}

export const useGetNftsByUser = ({
  profileId,
  profileAddress,
}: IGetNftsByUser): { nftPosts: IPost[] } => {
  const { data: nftData } = alchemyApi.useGetNftsForUserQuery({
    address: profileAddress,
  })

  return {
    nftPosts: nftData?.ownedNfts?.map((post: any): IPost => {
      const { contract, timeLastUpdated, media, contractMetadata, id, postType } = post

      return {
        contractAddress: contract?.address,
        creatorAddress: profileAddress,
        // creatorLensId: profileId,
        date: timeLastUpdated,
        from: null,
        id: null,
        image: media[0]?.raw,
        // isMirror: null,
        // lensId: null,
        // mirrorDescription: null,
        // mirrorFrom: null,
        // mirrorFromId: null,
        network: NetworkEnum.Ethereum,
        postType: null,
        to: null,
        txHash: null,
        nameCollection: contractMetadata?.name,
        sellerType: postType,
        tokenId: id?.tokenId,
        tokenType: contractMetadata?.tokenType,
        price: null,
        signedObject: null,
      }
    }),
  }
}
