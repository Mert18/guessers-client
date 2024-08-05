import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <Image
      className="p-2 bg-background_lighter rounded-md"
        src="/logo/logo-text.png"
        alt="logo"
        width={90}
        height={60}
      />
    </Link>
  );
};

export default Logo;
