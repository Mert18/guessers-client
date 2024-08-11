import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        className="p-2 rounded-md"
        src="/logo/logo-with-text.svg"
        alt="logo"
        width={120}
        height={60}
      />
    </Link>
  );
};

export default Logo;
