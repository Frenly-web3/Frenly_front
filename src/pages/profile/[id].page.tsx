import { useQuery } from '@apollo/client'
import { Meta } from '@components/meta/meta.component'
import EndOfFeed from '@components/shared/end-of-feed/end-of-feed.component'
import Event from '@components/shared/event/event.component'
import Header from '@components/shared/header/header.component'
import { useGetUnpublishedContentQuery } from '@store/auth/auth.api'
import { GET_DEFAULT_PROFILES } from '@store/lens/get-profile.query'
import { GET_PUBLICATIONS } from '@store/lens/get-publication.query'
import { useEthers } from '@usedapp/core'
import { useRouter } from 'next/router'
import { Stats } from 'node:fs'
import React, { useEffect, useState } from 'react'
import { useGetWalletProfileId } from 'src/contract/lens-hub.api'

const eventsMock = [
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
export default function ProfilePage() {
  // receipt.logs[0].topics[1]
  const { account } = useEthers()
  const [posts, setPosts] = useState<Array<any>>([])
  const {
    query: { id },
  } = useRouter()
  const accountId = useGetWalletProfileId(account || '')
  const { data: postsData } = useGetUnpublishedContentQuery(null)
  const { data: dataProfile } = useQuery(GET_DEFAULT_PROFILES, {
    variables: {
      request: {
        profileId: id,
      },
    },
  })
  const { data: feeds, refetch } = useQuery(GET_PUBLICATIONS, {
    variables: {
      request: {
        // publicationIds: dataFeeds?.data?.data,
        profileId: id,
        publicationTypes: ['POST', 'COMMENT', 'MIRROR'],
        limit: 10,
      },
    },
  })
  useEffect(() => {
    setPosts(postsData?.data)
  }, [postsData])

  console.log(feeds)

  return (
    <>
      <Meta title="Profile" description="Your profile" />

      <Header title="Profile" isOwner={id === accountId} nickname={dataProfile?.profile.handle} />

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
                    image={el.tokenUri}
                    key={index}
                    itemType="nft"
                    messageType={el.transferType}
                    id={postId}
                    totalUpvotes={0}
                    totalMirror={0}
                    profileId={id as string}
                  />
                )
              })
            : feeds?.publications.items.map((el: any, index: number) => {
                const { createdAt, collectModule, profile, metadata, id: postId, stats } = el
                // console.log(metadata?.attributes[0].value)

                return (
                  <Event
                    from={el.from}
                    to={'el.to'}
                    info={metadata.description}
                    image={'metadata.attributes[0].value'}
                    key={index}
                    name={profile.handle}
                    date={createdAt}
                    showDate={false}
                    showAuthor
                    messageType="SENT"
                    itemType="nft"
                    totalUpvotes={stats.totalUpvotes}
                    totalMirror={stats.totalAmountOfMirrors}
                    id={postId}
                    profileId={profile.id}
                    refetchInfo={refetch}
                  />
                )
              })}
        </section>
      </main>

      <EndOfFeed page="drafts" />
    </>
  )
}
