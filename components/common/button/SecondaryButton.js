import React from 'react'

const SecondaryButton = ({ type, onClick, text, href }) => {
    if (href) {
      return (
        <Link href={href} onClick={onClick}>
          <div className="bg-background2 border border-secondary text-text hover:bg-secondary hover:text-background rounded-sm transition-all w-full p-2 my-2">
            {text}
          </div>
        </Link>
      );
    } else {
      return (
        <button
          className="bg-background2 border border-secondary text-text hover:bg-secondary hover:text-background rounded-sm transition-all w-full p-2 my-2"
          type={type}
          onClick={onClick}
        >
          <p className="p-2 text-xs">{text}</p>
        </button>
      );
    }
  };
  
  export default SecondaryButton;