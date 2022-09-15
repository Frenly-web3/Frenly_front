import Event from '@components/shared/event/event.component'
import styles from '@pages/myEvents/myEvents.module.scss'
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

export default function MyEventsPage() {
  // const declinePost = () => {}

  return (
    <div className={styles.myEvents}>
      <div className={styles.content}>
        <div className={styles.address}>
          {`${'0x0e2f7D1a076100059824c14021919eFB509bA25b'.slice(
            0,
            7
          )}...${'0x0e2f7D1a076100059824c14021919eFB509bA25b'.slice(-7)}`}
        </div>
        <h3 className={styles.eventsTitle}>My Events</h3>
        <div className={styles.events}>
          {eventsMock.map((el, index) => {
            return (
              <Event
                isAddCap
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
