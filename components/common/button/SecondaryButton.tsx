import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ISecondaryButtonProps {
  type?: "button" | "submit";
  onClick?: () => void;
  text: string;
  href?: string;
  icon?: string;
  external?: boolean;
}

const SecondaryButton = ({ type, onClick, text, href, icon, external = false }: ISecondaryButtonProps) => {
  if (href) {
    return (
      <Link href={href} onClick={onClick} className="relative">
        <div  className={`bg-transparent hover:underline text-secondary hover:text-secondary90 transition-all w-max`}>
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
      className={`bg-transparent hover:underline" text-secondary hover:text-secondary90 transition-all w-max relative`}
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
        <p className="text-xs">{text}</p>
        {external && (
          <Image src="/external.svg" alt="arrow showing upward" width={10} height={10} className="absolute top-0 right-0" />
        )}
      </button>
    );
  }
};

export default SecondaryButton;
