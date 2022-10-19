/* eslint-disable no-unsafe-optional-chaining */
import { useQuery } from '@apollo/client'
import { Meta } from '@components/meta/meta.component'
import EndOfFeed from '@components/shared/end-of-feed/end-of-feed.component'
import Event from '@components/shared/event/event.component'
import Header from '@components/shared/header/header.component'
import { useGetFilteredFeedQuery, useHasLanceProfileQuery } from '@store/auth/auth.api'
import { GET_PUBLICATIONS } from '@store/lens/get-publication.query'
import { useEthers } from '@usedapp/core'
import router from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useGetWalletProfileId } from 'src/contract/lens-hub.api'
import { lensHubABI } from 'src/contract/lens-hub.contract'

import styles from './posts.module.scss'

export default function FeedPage() {
  const { account } = useEthers()

  const accountId = useGetWalletProfileId(account || '')
  const [isReloadProfile, reloadProfile] = useState(false)
  const { data: dataHasProfile } = useHasLanceProfileQuery(account || '', {
    skip: !isReloadProfile,
  })

  // const { data: dataFeeds, refetch: refetchFeeds } = useGetFeedQuery({ take: 20, skip: 0 })
  const { data: dataFeeds, refetch: refetchFeeds } = useGetFilteredFeedQuery({ take: 20, skip: 0 })
  const drafts = useQuery(GET_PUBLICATIONS, {
    variables: {
      request: {
        publicationIds: dataFeeds?.data
          .filter((el: any) => el.lensId !== null)
          .map((el: any) => el.lensId),
        // profileId: accountId,
        // publicationTypes: ['POST', 'COMMENT', 'MIRROR'],
        // limit: 10,
      },
    },
  })
  // console.log('Back', dataFeeds?.data)
  // console.log('Lens', drafts)
  const refetchInfo = async () => {
    refetchFeeds()
    await drafts.refetch()
  }

  useEffect(() => {
    if (account) {
      reloadProfile(true)
    }
  }, [account])

  return (
    <>
      <Meta title="Frenly Feed" description="Your Frenly Feed" />

      <Header title="frenly feed" showAddPost accountId={accountId} />

      <main>
        <section className="relative">
          {dataFeeds &&
            dataFeeds?.data
              .filter((el: any) => el.lensId !== null)
              .map((el: any) => {
                const { lensId, image, isMirror } = el

                let index
                drafts?.data?.publications?.items?.forEach((element: any, _index: number) => {
                  if (element.id == lensId) {
                    index = _index
                  }
                })

                if (drafts?.data?.publications?.items[Number(index)]) {
                  const { createdAt, profile, metadata, id, stats, mirrorOf } =
                    drafts?.data?.publications?.items[Number(index)]

                  return (
                    <Event
                      from={metadata?.attributes[4]?.value}
                      to={metadata?.attributes[3]?.value}
                      contractAddress={metadata?.attributes[1]?.value}
                      info={metadata?.name}
                      image={metadata?.attributes[9]?.value}
                      key={id}
                      name={profile.handle}
                      date={createdAt}
                      showDate={false}
                      showAuthor
                      messageType={metadata.attributes[5].value}
                      itemType="nft"
                      totalUpvotes={stats.totalUpvotes}
                      totalMirror={stats.totalAmountOfMirrors}
                      id={id}
                      profileId={profile.id}
                      refetchInfo={refetchInfo}
                      txHash={metadata.attributes[8].value}
                      blockchainType={metadata.attributes[7].value}
                      isMirror={isMirror}
                      handleMirror={mirrorOf?.profile.ownedBy}
                      creator={profile.ownedBy}
                    />
                  )
                }
                return <></>
              })}
        </section>
      </main>

      <EndOfFeed page="feed" />
    </>
  )
}
