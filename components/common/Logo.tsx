import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="bg-primary-default text-background-bright font-bold p-2 text-sm rounded-lg">guessers.io</h1>
    </Link>
  );
};

export default Logo;
