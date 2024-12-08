import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LogoWithText = () => {
  return (
    <Link href="/home">
      <Image src="/logo/logo-with-text.svg" alt="letter g" width={50} height={50} />
    </Link>
  )
}

export default LogoWithText