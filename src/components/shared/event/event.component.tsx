import styles from '@components/shared/event/event.module.scss'

export interface IEventProperties {
  isAddCap?: boolean
  image: string
  from: string
  to: string
  info: string
}

export default function Event(props: IEventProperties): JSX.Element {
  const { isAddCap, image, from, to, info } = props

  return (
    <div className={styles.event}>
      <div className={styles.content}>
        <img src={image} alt="image" width="100px" height="100px" />
        <div className={styles.info}>
          <span>From: {from}</span>
          <span>To: {to}</span>
          <span>Information: {info}</span>
        </div>
        {isAddCap && (
          <div className={styles.buttons}>
            <button>Add</button>
            <button>Decline</button>
          </div>
        )}
      </div>
    </div>
  )
}
