import { Meta } from '@components/meta/meta.component'
import EndOfFeed from '@components/shared/end-of-feed/end-of-feed.component'
import Event from '@components/shared/event/event.component'
import Header from '@components/shared/header/header.component'
import React from 'react'

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
  // const addPost = () => {}

  // const declinePost = () => {}

  return (
    <>
      <Meta title="Drafts" description="Your drafts page" />

      <Header title="Drafts" />

      <main>
        <div className="container">
          <h3 className="py-2 text-xl font-bold">Today</h3>
        </div>

        <section>
          {eventsMock.map((el, index) => {
            return (
              <Event
                isAddCap
                from={el.from}
                to={el.to}
                info={el.info}
                image={el.image}
                key={index}
                itemType="token"
                messageType="sent"
              />
            )
          })}
        </section>
      </main>

      <EndOfFeed page="drafts" />
    </>
  )
}
