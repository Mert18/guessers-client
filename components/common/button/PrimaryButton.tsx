import Image from "next/image";
import Link from "next/link";

interface IPrimaryButton {
  type: "submit" | "button";
  onClick?: () => void;
  text: string;
  href?: string;
  bg?: boolean;
  danger?: boolean;
}

const PrimaryButton = ({
  type,
  onClick,
  text,
  href,
  bg = false,
  danger,
}: IPrimaryButton) => {
  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`py-2 flex-1 ${danger ? "text-failure hover:text-background-bright hover:bg-failure border-failure" : "text-primary-default hover:text-background-bright border-primary-default"}   hover:bg-primary-default transition-all text-center bg-background-bright rounded-md border-2`}
      >
        <div className={`text-text font-bold flex justify-center items-center`}>
          <p>{text}</p>
        </div>
      </Link>
    );
  } else {
    return (
      <button
        className={`${
          bg
            ? "bg-background-bright p-2"
            : "bg-transparent hover:text-primary-bright"
        } rounded-md transition-all text-xs flex-1 font-bold text-primary-default`}
        type={type}
        onClick={onClick}
      >
        <p>{text}</p>
      </button>
    );
  }
};

export default PrimaryButton;
