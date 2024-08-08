import React from "react";

const SecondaryButton = ({ type, onClick, text, href, icon }) => {
  if (href) {
    return (
      <Link href={href} onClick={onClick}>
        <div className="bg-background2 border border-secondary text-text hover:bg-secondary hover:text-background rounded-md transition-all w-full p-2 my-2 flex items-center">
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
        className="bg-background2 border border-secondary text-text hover:bg-secondary hover:text-background transition-all w-full p-2 my-2 rounded-md"
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
      </button>
    );
  }
};

export default SecondaryButton;
