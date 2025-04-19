import { ColorEnum } from "@/enum/enum";
import { Jersey_10 } from "next/font/google";
import Link from "next/link";

interface ICustomButton {
  type: "submit" | "button";
  onClick?: () => void;
  text: string;
  bg?: boolean;
  icon?: React.ReactNode;
  color?: ColorEnum;
}

const CustomButton = ({
  type,
  onClick,
  text,
  bg = false,
  icon,
  color = ColorEnum.PRIMARY,
}: ICustomButton) => {
  return (
    <button
      className={`${
        bg
          ? `${
              color === ColorEnum.PRIMARY
                ? "gradient-primary text-white"
                : color === ColorEnum.SECONDARY
                ? "gradient-secondary text-white"
                : color === ColorEnum.WARNING
                ? "gradient-warning text-white"
                : color === ColorEnum.FAILURE
                ? "gradient-failure text-white"
                : color === ColorEnum.SUCCESS
                ? "gradient-success text-white"
                : ""
            }`
          : "bg-transparent text-primary-dark hover:text-primary hover:underline p-0"
      } flex-1 font-bold flex justify-center items-center p-2 rounded-md w-full h-full`}
      type={type}
      onClick={onClick}
    >
      {icon && (
        <div className="flex justify-center items-center text-white mr-2">
          {icon}
        </div>
      )}
      <p>{text}</p>
    </button>
  );
};

export default CustomButton;
