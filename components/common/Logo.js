import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="rounded-md bg-background_lighter p-2">
      <Image
        src="/logo/logo-text.png"
        alt="logo"
        width={90}
        height={60}
      />
    </Link>
  );
};

export default Logo;
