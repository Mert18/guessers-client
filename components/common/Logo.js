import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="text-primary font-bold">guessers.io</h1>
    </Link>
  );
};

export default Logo;
