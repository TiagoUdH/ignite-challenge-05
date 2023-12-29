import Link from "next/link"

export default function Header() {
  return (
    <header>
      <figure>
        <Link href="/">
          <img src="logo.svg" alt="logo" />
        </Link>
      </figure>
    </header>
  )
}
