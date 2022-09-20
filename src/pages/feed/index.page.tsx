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
import React, { useEffect, useState } from 'react'
import { useGetWalletProfileId } from 'src/contract/lens-hub.api'

import styles from './posts.module.scss'

const postsMock = [
  {
    from: '0x0e2f7D1a076100059824c14021919eFB509bA25b',
    to: '0x0e2f7D1a076100059824c14021919eFB509bA25b',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
  },
  {
    from: '0x0e2f7D1a076100059824c14021919eFB509bA25b',
    to: '0x0e2f7D1a076100059824c14021919eFB509bA25b',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
  },
  {
    from: '0x0e2f7D1a076100059824c14021919eFB509bA25b',
    to: '0x0e2f7D1a076100059824c14021919eFB509bA25b',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
  },
]

export default function FeedPage() {
  const { account } = useEthers()

  const accountId = useGetWalletProfileId(account || '')
  const [isReloadProfile, reloadProfile] = useState(false)
  const { data: dataHasProfile } = useHasLanceProfileQuery(account || '', {
    skip: !isReloadProfile,
  })
  const dataFeeds = useGetFeedQuery({ take: 10, skip: 0 })
  const drafts = useQuery(GET_PUBLICATIONS, {
    variables: {
      request: {
        publicationIds: dataFeeds?.data?.data,
        // profileId: accountId,
        // publicationTypes: ['POST', 'COMMENT', 'MIRROR'],
        // limit: 10,
      },
    },
  })
  console.log(dataFeeds)

  useEffect(() => {
    if (account) {
      reloadProfile(true)
    }
  }, [account])
  console.log(drafts)
  return (
    <>
      <Meta title="Feed" description="Your Frenly Feed" />

      <Header title="Frenly Feed" showAddPost />

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

        <section>
          {drafts?.data?.publications?.items.map((el: any, index: number) => {
            const { createdAt, collectModule, profile, metadata, id, stats } = el
            return (
              <Event
                from={el.from}
                to={'el.to'}
                info={metadata.description}
                image={'el.image'}
                key={index}
                name={profile.handle}
                date={createdAt}
                showDate={false}
                showAuthor
                messageType="SENT"
                itemType="nft"
                totalUpvotes={stats.totalUpvotes}
                id={id}
              />
            )
          })}
        </section>
      </main>

      <EndOfFeed page="feed" />
    </>
  )
}
