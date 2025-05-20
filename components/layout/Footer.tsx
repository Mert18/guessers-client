import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex justify-center items-center h-[10vh] relative w-full">
      <div>
        <Link className="flex items-center text-primary" href="https://github.com/Mert18/guessers-client">
          <span>git</span>

          <Image src="/icons/github.svg" alt="github" width={40} height={40} />
          <span>hub</span>
        </Link>
      </div>

      <div className="absolute right-2">
        <Link href="/home/turnofafriendlycard">
          <Image src="/icons/cards.svg" alt="cards" width={32} height={32} />
        </Link>
      </div>

      <div className="absolute left-2">
        <Link href="/home/turnofafriendlycard">
          <Image src="/icons/cards.svg" alt="cards" width={32} height={32} />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
