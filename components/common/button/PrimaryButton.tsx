import Link from "next/link";

interface IPrimaryButton {
  type: "submit" | "button";
  onClick?: () => void;
  text: string;
  href?: string;
  bg?: boolean;
}

const PrimaryButton = ({
  type,
  onClick,
  text,
  href,
  bg = false
}: IPrimaryButton) => {
  if (href) {
    return (
      <Link href={href} onClick={onClick} className="flex-1 hover:text-primary90 hover:bg-backgroundhover transition-all text-center">
        <div
          className={`py-2 text-primary font-bold`}
        >
          <p>{text}</p>
        </div>
      </Link>
    );
  } else {
    return (
      <button
        className={`${bg ? "bg-primary text-background hover:bg-primary90 p-2" : "bg-transparent text-primary hover:text-primary90"} rounded-sm transition-all text-xs flex-1 font-bold`}
        type={type}
        onClick={onClick}
      >
        <p>{text}</p>
      </button>
    );
  }
};

export default PrimaryButton;
