import Link from "next/link";
import React from "react";

const PrimaryButton = ({ type, onClick, text, href }) => {
  if (href) {
    return (
      <Link href={href} onClick={onClick}>
        <div className="bg-background_lighter border border-primary text-text hover:bg-primary hover:text-background rounded-sm transition-all w-full p-2">
          {text}
        </div>
      </Link>
    );
  } else {
    return (
      <button
        className="bg-background_lighter border border-primary text-text hover:bg-primary hover:text-background rounded-sm transition-all w-full p-2"
        type={type}
        onClick={onClick}
      >
        <p className="p-2 text-xs">{text}</p>
      </button>
    );
  }
};

export default PrimaryButton;
