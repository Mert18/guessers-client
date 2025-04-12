import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/home">
      <Image src="/logo/logo.svg" alt="letter g" width={50} height={50} />
    </Link>
  );
};

export default Logo;
