import styles from '@components/shared/header/header.module.scss'

export interface IHeaderProps {}

export default function Header(props: IHeaderProps): JSX.Element {
  return <header className={styles.header}></header>
}
