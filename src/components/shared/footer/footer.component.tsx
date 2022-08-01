import styles from '@components/shared/footer/footer.module.scss'

export interface IFooterProps {}

export default function Footer(props: IFooterProps): JSX.Element {
  return <footer className={styles.footer}></footer>
}
