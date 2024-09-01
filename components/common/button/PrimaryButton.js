import Image from "next/image";
import Link from "next/link";
import React from "react";

const PrimaryButton = ({ type, onClick, text, href, noBg = false, external = false }) => {
  if (href) {
    return (
      <Link href={href} onClick={onClick} className="relative">
        <div
          className={`${
            noBg
              ? "bg-transparent hover:underline"
              : "bg-background2 border border-primary rounded-sm hover:bg-background3"
          } text-primary transition-all w-max p-2 my-2`}
        >
          <p className="text-sm">{text}</p>
        </div>
        {external && (
          <Image src="/external.svg" alt="arrow showing upward" width={10} height={10} className="absolute top-0 right-0" />
        )}
      </Link>
    );
  } else {
    return (
      <button
        className={`${
          noBg
            ? "bg-transparent hover:underline"
            : "bg-background2 border border-primary rounded-sm hover:bg-background3"
        } text-primary transition-all w-max p-2 my-2`}
        type={type}
        onClick={onClick}
      >
        <p className="text-sm">{text}</p>
        {external && (
          <Image src="/external.svg" alt="arrow showing upward" width={10} height={10} className="absolute top-0 right-0" />
        )}
      </button>
    );
  }
};

export default PrimaryButton;
