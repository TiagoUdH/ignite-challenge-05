import Link from "next/link"

import { useRouter } from "next/router"
import commonStyles from "../../styles/common.module.scss"
import styles from "./header.module.scss"

export default function Header() {
  const { asPath } = useRouter()

  const marginsClassName = asPath === "/" ? styles.margins : ''

  return (
    <header className={`${commonStyles.container} ${styles.container} ${marginsClassName}`}>
      <figure className={commonStyles.content}>
        <Link href="/">
          <img src="logo.svg" alt="logo" />
        </Link>
      </figure>
    </header>
  )
}
