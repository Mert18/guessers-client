import Image from "next/image";
import Link from "next/link";
import React from "react";

const SecondaryButton = ({ type, onClick, text, href, icon, noBg = false, external = false }) => {
  if (href) {
    return (
      <Link href={href} onClick={onClick} className="relative">
        <div  className={`${
            noBg
              ? "bg-transparent hover:underline"
              : "bg-background2 border border-secondary rounded-sm hover:bg-background3"
          } text-secondary transition-all w-max`}>
          {icon && (
            <Image
              src={`/${icon}.svg`}
              width={15}
              height={15}
              alt={icon}
              className="mr-2"
            />
          )}
          {text}
        </div>
      </Link>
    );
  } else {
    return (
      <button
      className={`${
        noBg
          ? "bg-transparent hover:underline"
          : "bg-background2 border border-secondary rounded-sm hover:bg-background3"
      } text-secondary transition-all w-max relative`}
        type={type}
        onClick={onClick}
      >
        {icon && (
          <Image
            src={`/${icon}.svg`}
            width={15}
            height={15}
            alt={icon}
            className="mr-2"
          />
        )}
        <p className="p-2 text-xs">{text}</p>
        {external && (
          <Image src="/external.svg" alt="arrow showing upward" width={10} height={10} className="absolute top-0 right-0" />
        )}
      </button>
    );
  }
};

export default SecondaryButton;
