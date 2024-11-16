import Link from "next/link";

interface IPrimaryButton {
  type: "submit" | "button";
  onClick?: () => void;
  text: string;
  href?: string;
  external?: boolean;
  mr?: boolean;
}

const PrimaryButton = ({
  type,
  onClick,
  text,
  href,
  external = false,
  mr = false,
}: IPrimaryButton) => {
  if (href) {
    return (
      <Link href={href} onClick={onClick} className="relative p-2">
        <div
          className={`p-2" ${
            mr && "mr-2"
          } text-primary hover:underline hover:text-primary90 transition-all w-max text-xs`}
        >
          <p>{text}</p>
        </div>
      </Link>
    );
  } else {
    return (
      <button
        className={`bg-primary rounded-sm hover:underline text-background hover:bg-primary90 transition-all w-max text-xs p-2 relative`}
        type={type}
        onClick={onClick}
      >
        <p>{text}</p>
      </button>
    );
  }
};

export default PrimaryButton;
