import React from "react";

const PrimaryButton = ({ type, onClick, text }) => {
  return (
    <button
      className="bg-background_lighter border border-primary text-text hover:bg-primary hover:text-background rounded-sm m-2 transition-all w-full"
      type={type}
      onClick={onClick}
    >
      <p className="p-2 text-xs">{text}</p>
    </button>
  );
};

export default PrimaryButton;
