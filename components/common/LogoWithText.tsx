import Image from "next/image";
import Link from "next/link";
import React from "react";

const LogoWithText = () => {
  return (
    <Link
      href={"/home"}
      className="flex justify-center items-center w-full mb-4"
    >
      <Image
        src="/logo/logo-with-text.svg"
        alt="logo"
        width={240}
        height={240}
      />
    </Link>
  );
};

export default LogoWithText;
