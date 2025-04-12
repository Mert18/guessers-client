import { Jersey_10 } from "next/font/google";
import Link from "next/link";
import React from "react";

interface ISecondaryButton {
  type: "submit" | "button";
  onClick?: () => void;
  text: string;
  href?: string;
  bg?: boolean;
  danger?: boolean;
  icon?: React.ReactNode;
}

const font = Jersey_10({ subsets: ["latin"], weight: "400" });

const SecondaryButton = ({
  type,
  onClick,
  text,
  href,
  bg = false,
  icon,
}: ISecondaryButton) => {
  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`py-2 flex-1 text-center ${font.className}`}
      >
        <div
          className={`h-full font-bold flex justify-center items-center text-white p-2 ${
            bg
              ? "bg-gradient-to-bl from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary transition-all"
              : "bg-transparent hover:text-secondary"
          }`}
        >
          {icon && (
            <div className="flex justify-center items-center text-white">
              {icon}
            </div>
          )}
          <p>{text}</p>
        </div>
      </Link>
    );
  } else {
    return (
      <button
        className={`${
          bg
            ? "bg-gradient-to-bl from-secondary to-secondary-bright hover:from-secondary-bright hover:to-secondary"
            : "bg-transparent hover:text-secondary-dark"
        } flex-1 font-bold text-white flex justify-center items-center p-2 rounded-md h-full ${
          font.className
        } w-full`}
        type={type}
        onClick={onClick}
      >
        {icon && (
          <div className="flex justify-center items-center text-white mr-3">
            {icon}
          </div>
        )}
        <p>{text}</p>
      </button>
    );
  }
};

export default SecondaryButton;
