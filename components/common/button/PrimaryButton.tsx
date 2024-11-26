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
}: IPrimaryButton) => {
  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`py-2 flex-1 transition-all text-center`}
      >
        <div
          className={`text-text font-bold flex justify-center items-center rounded-md ${
            bg
              ? "bg-primary-default text-background-bright p-2 hover:bg-primary-bright"
              : "bg-transparent text-text-default hover:text-primary-default"
          }`}
        >
          <p>{text}</p>
        </div>
      </Link>
    );
  } else {
    return (
      <button
        className={`${
          bg
            ? "bg-primary-default text-background-bright p-2 hover:bg-primary-bright"
            : "bg-transparent text-text-default hover:text-primary-default"
        } rounded-md transition-all text-xs flex-1 font-bold`}
        type={type}
        onClick={onClick}
      >
        <p>{text}</p>
      </button>
    );
  }
};

export default PrimaryButton;
