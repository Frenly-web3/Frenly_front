import { useQuery } from '@apollo/client'
import Event from '@components/shared/event/event.component'
import styles from '@pages/posts/posts.module.scss'
import { GET_PUBLICATIONS } from '@store/lens/get-publication.query'
import { useEthers } from '@usedapp/core'
import React from 'react'
import { useGetWalletProfileId } from 'src/contract/lens-hub.api'

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

export default function PostsPage() {
  const { account } = useEthers()
  const profileId = useGetWalletProfileId(account || '')

  const events = useQuery(GET_PUBLICATIONS, {
    variables: {
      request: {
        profileId,
        publicationTypes: ['POST', 'COMMENT', 'MIRROR'],
        limit: 10,
      },
    },
  })

  // const addPost = () => {}

  // const declinePost = () => {}
  console.log(events)

  return (
    <div className={styles.postsPage}>
      <div className={styles.content}>
        <div className={styles.address}>
          {`${'0x0e2f7D1a076100059824c14021919eFB509bA25b'.slice(
            0,
            7
          )}...${'0x0e2f7D1a076100059824c14021919eFB509bA25b'.slice(-7)}`}
        </div>

        <input className={styles.search} placeholder="Address"></input>
        <h3 className={styles.postsTitle}>Posts</h3>
        <div className={styles.posts}>
          {postsMock.map((el, index) => {
            return (
              <Event
                from={el.from}
                to={el.to}
                info={el.info}
                image={el.image}
                key={index}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
