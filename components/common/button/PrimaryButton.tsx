import { Jersey_10 } from "next/font/google";
import Link from "next/link";

interface IPrimaryButton {
  type: "submit" | "button";
  onClick?: () => void;
  text: string;
  href?: string;
  bg?: boolean;
  danger?: boolean;
  icon?: React.ReactNode;
}

const font = Jersey_10({ subsets: ["latin"], weight: "400"});

const PrimaryButton = ({
  type,
  onClick,
  text,
  href,
  bg = false,
  icon,
}: IPrimaryButton) => {
  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`py-2 flex-1 text-center ${font.className}`}
      >
        <div
          className={`font-bold flex justify-center items-center text-white h-full p-2 ${
            bg
              ? "btn-gradient"
              : "bg-transparent hover:text-primary"
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
            ? "btn-gradient"
            : "text-primary-dark"
        } flex-1 font-bold text-white flex justify-center items-center p-2 rounded-md  ${font.className} w-full h-full`}
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

export default PrimaryButton;
