import { useMutation, useQuery } from '@apollo/client'
import { Meta } from '@components/meta/meta.component'
import EndOfFeed from '@components/shared/end-of-feed/end-of-feed.component'
import Event from '@components/shared/event/event.component'
import Header from '@components/shared/header/header.component'
import { useGetUnpublishedContentQuery } from '@store/auth/auth.api'
import { FOLLOW_USER } from '@store/lens/account/add-follow.mutation'
import { CREATE_UNFOLLOW_TYPED_DATA } from '@store/lens/account/unfollow.mutation'
// import { IS_FOLLOWING } from '@store/lens/account/is-follow.query'
import { GET_DEFAULT_PROFILES } from '@store/lens/get-profile.query'
import { GET_PUBLICATIONS } from '@store/lens/get-publication.query'
import { signedTypeData, splitSignature } from '@store/lens/post/create-post.utils'
import { useEthers } from '@usedapp/core'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import {
  useFollowWithSig,
  useGetWalletProfileId,
  useUnfollowWithSig,
} from 'src/contract/lens-hub.api'

export default function ProfilePage() {
  // receipt.logs[0].topics[1]
  const { account, library } = useEthers()
  const [posts, setPosts] = useState<Array<any>>([])
  const [isLoading, setIsLoading] = useState(false)
  const {
    query: { id },
  } = useRouter()
  const accountId = useGetWalletProfileId(account || '')
  const { data: postsData } = useGetUnpublishedContentQuery(null)
  const { data: dataProfile, refetch: refetchProfile } = useQuery(GET_DEFAULT_PROFILES, {
    variables: {
      request: {
        profileId: id,
      },
    },
  })
  const { send: followWithSig, state: followWithSigState } = useFollowWithSig()
  const { send: unfollowWithSig, state: unfollowWithSigState } = useUnfollowWithSig()
  const { data: feeds, refetch } = useQuery(GET_PUBLICATIONS, {
    variables: {
      request: {
        // publicationIds: dataFeeds?.data?.data,
        profileId: id,
        publicationTypes: ['POST', 'MIRROR'],
        limit: 10,
      },
    },
  })
  const [followToUser, dataFollowToUser] = useMutation(FOLLOW_USER)
  const [unfollowToUser, dataUnfollowToUser] = useMutation(CREATE_UNFOLLOW_TYPED_DATA)

  useEffect(() => {
    setPosts(postsData?.data)
  }, [postsData])

  console.log(postsData)

  const followHandler = async () => {
    const result = await followToUser({
      variables: {
        request: {
          follow: [
            {
              profile: id,
            },
          ],
        },
      },
    })

    const typedData = result?.data?.createFollowTypedData?.typedData

    const signer = library?.getSigner()

    // if (!typedData) return
    const signature = await signedTypeData(
      typedData.domain,
      typedData.types,
      typedData.value,
      signer
    )
    const { v, r, s } = splitSignature(signature)

    const tx = await followWithSig({
      follower: account,
      profileIds: typedData.value.profileIds,
      datas: typedData.value.datas,
      sig: {
        v,
        r,
        s,
        deadline: typedData.value.deadline,
      },
    })

    refetchProfile()
  }

  const unfollowHandler = async () => {
    const result = await unfollowToUser({
      variables: {
        request: {
          profile: id,
        },
      },
    })

    const typedData = result?.data?.createUnfollowTypedData?.typedData

    const signer = library?.getSigner()

    // if (!typedData) return
    const signature = await signedTypeData(
      typedData.domain,
      typedData.types,
      typedData.value,
      signer
    )
    const { v, r, s } = splitSignature(signature)

    const tx = await unfollowWithSig(typedData.value.tokenId, {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    })

    refetchProfile()
  }

  return (
    <>
      <Meta title="Profile" description="Your profile" />

      <Header
        title="Profile"
        isOwner={id === accountId}
        nickname={dataProfile?.profile.handle}
        address={dataProfile?.profile.ownedBy}
        followHandle={followHandler}
        unfollowHandle={unfollowHandler}
        followers={dataProfile?.profile.stats.totalFollowers}
        isFollow={dataProfile?.profile.isFollowedByMe}
      />

      <main>
        <div className="container">
          <h3 className="py-2 text-xl font-bold">Today</h3>
        </div>

        <section>
          {id === accountId
            ? posts?.map((element, index) => {
                const { content: el, id: postId, creationDate } = element
                console.log(element)

                return (
                  <Event
                    isAddCap
                    from={el.fromAddress}
                    to={el.toAddress}
                    info={el.info}
                    date={creationDate}
                    image={el.image}
                    key={index}
                    itemType="nft"
                    messageType={el.transferType}
                    id={postId}
                    totalUpvotes={0}
                    totalMirror={0}
                    profileId={id as string}
                    txHash={el.transactionHash}
                    blockchainType={el.blockchainType == 0 ? 'ETHEREUM' : 'POLYGON'}
                  />
                )
              })
            : feeds?.publications.items.map((el: any, index: number) => {
                const { createdAt, collectModule, profile, metadata, id: postId, stats } = el
                console.log(el)

                return (
                  <Event
                    from={metadata.attributes[4].value}
                    to={metadata.attributes[3].value}
                    info={metadata.description}
                    image={metadata.attributes[0].value}
                    key={index}
                    name={profile.handle}
                    date={createdAt}
                    showDate={false}
                    showAuthor
                    messageType={metadata.attributes[5].value}
                    itemType="nft"
                    totalUpvotes={stats.totalUpvotes}
                    totalMirror={stats.totalAmountOfMirrors}
                    id={postId}
                    profileId={profile.id}
                    refetchInfo={refetch}
                    txHash={metadata.attributes[8].value}
                    blockchainType={metadata.attributes[7].value}
                  />
                )
              })}
        </section>
      </main>

      <EndOfFeed page="drafts" />
    </>
  )
}
