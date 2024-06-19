import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="rounded-md m-2">
      <Image
        src="/logo/logo.svg"
        alt="logo"
        width={60}
        height={60}
        className="w-auto h-auto"
        priority={false}
      />
    </Link>
  );
};

export default Logo;
