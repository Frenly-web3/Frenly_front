import { useQuery } from '@apollo/client'
import { Meta } from '@components/meta/meta.component'
import EndOfFeed from '@components/shared/end-of-feed/end-of-feed.component'
import Event from '@components/shared/event/event.component'
import Header from '@components/shared/header/header.component'
import { useGetUnpublishedContentQuery } from '@store/auth/auth.api'
import { GET_PUBLICATIONS } from '@store/lens/get-publication.query'
import React, { useEffect, useState } from 'react'

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
export default function DraftsPage() {
  // receipt.logs[0].topics[1]
  const [posts, setPosts] = useState<Array<any>>([])
  const { data: postsData } = useGetUnpublishedContentQuery(null)
  useEffect(() => {
    setPosts(postsData?.data)
  }, [postsData])
  console.log(posts)

  return (
    <>
      <Meta title="Drafts" description="Your drafts page" />

      <Header title="Drafts" />

      <main>
        <div className="container">
          <h3 className="py-2 text-xl font-bold">Today</h3>
        </div>

        <section>
          {posts?.map((element, index) => {
            const { content: el, id, creationDate } = element
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
                id={id}
              />
            )
          })}
        </section>
      </main>

      <EndOfFeed page="drafts" />
    </>
  )
}
