import { useQuery } from '@apollo/client'
import { Meta } from '@components/meta/meta.component'
import EndOfFeed from '@components/shared/end-of-feed/end-of-feed.component'
import Event from '@components/shared/event/event.component'
import Header from '@components/shared/header/header.component'
import {
  useGetFeedQuery,
  useGetUnpublishedContentQuery,
  useHasLanceProfileQuery,
} from '@store/auth/auth.api'
import { GET_PUBLICATIONS } from '@store/lens/get-publication.query'
import { useEthers } from '@usedapp/core'
import React, { useEffect, useMemo, useState } from 'react'
import { useGetWalletProfileId } from 'src/contract/lens-hub.api'

import styles from './posts.module.scss'

export default function FeedPage() {
  const { account } = useEthers()

  const accountId = useGetWalletProfileId(account || '')
  const [isReloadProfile, reloadProfile] = useState(false)
  const { data: dataHasProfile } = useHasLanceProfileQuery(account || '', {
    skip: !isReloadProfile,
  })

  const { data: dataFeeds, refetch: refetchFeeds } = useGetFeedQuery({ take: 10, skip: 0 })
  const drafts = useQuery(GET_PUBLICATIONS, {
    variables: {
      request: {
        publicationIds: dataFeeds?.data.map((el: any) => el.lensId),
        // profileId: accountId,
        // publicationTypes: ['POST', 'COMMENT', 'MIRROR'],
        // limit: 10,
      },
    },
  })

  const refetchInfo = async () => {
    await refetchFeeds()
    await drafts.refetch()
  }

  useEffect(() => {
    if (account) {
      reloadProfile(true)
    }
  }, [account])
  console.log('DRAFTS', drafts?.data?.publications?.items, dataFeeds?.data?.data)
  return (
    <>
      <Meta title="Frenly Feed" description="Your Frenly Feed" />

      <Header title="Frenly Feed" showAddPost accountId={accountId} />

      <main>
        <div className="container">
          <h3 className="py-2 text-xl font-bold">Yesterday</h3>
        </div>
        {/* <div className={styles.address}>
            {`${'0x0e2f7D1a076100059824c14021919eFB509bA25b'.slice(
              0,
              7
            )}...${'0x0e2f7D1a076100059824c14021919eFB509bA25b'.slice(-7)}`}
          </div> */}

        {/* <input className={styles.search} placeholder="Address"></input> */}
        {/* <h3 className={styles.postsTitle}>Posts</h3> */}

        <section className="relative">
          {dataFeeds &&
            drafts?.data?.publications?.items.map((el: any) => {
              const { createdAt, collectModule, profile, metadata, id, stats, mirrorOf } = el

              let index
              dataFeeds?.data?.forEach((element: any, _index: number) => {
                if (element.lensId == id) {
                  console.log(element.lensId, id, dataFeeds?.data[_index])
                  index = _index
                }
              })
              console.log(index)

              return (
                <Event
                  from={metadata?.attributes[4].value}
                  to={metadata?.attributes[3].value}
                  contractAddress={metadata?.attributes[1].value}
                  info={metadata.description}
                  image={dataFeeds?.data[Number(index)]?.image}
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
                  isMirror={dataFeeds?.data[Number(index)]?.isMirror}
                  handleMirror={mirrorOf?.profile.handle}
                />
              )
            })}
        </section>
      </main>

      <EndOfFeed page="feed" />
    </>
  )
}
