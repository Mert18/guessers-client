import Image from "next/image";
import Link from "next/link";
import React from "react";

const PrimaryButton = ({
  type,
  onClick,
  text,
  href,
  external = false,
  mr = false,
}) => {
  if (href) {
    return (
      <Link href={href} onClick={onClick} className="relative p-2">
        <div
          className={`"bg-transparent hover:underline" ${
            mr && "mr-2"
          } text-primary transition-all w-max text-xs`}
        >
          <p>{text}</p>
        </div>
        {external && (
          <Image
            src="/external.svg"
            alt="arrow showing upward"
            width={10}
            height={10}
            className="absolute right-4 top-4"
          />
        )}
      </Link>
    );
  } else {
    return (
      <button
        className={`bg-transparent hover:underline text-primary transition-all w-max text-xs p-2`}
        type={type}
        onClick={onClick}
      >
        <p>{text}</p>
        {external && (
          <Image
            src="/external.svg"
            alt="arrow showing upward"
            width={10}
            height={10}
            className="absolute right-4 top-4"
          />
        )}
      </button>
    );
  }
};

export default PrimaryButton;
