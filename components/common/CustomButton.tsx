import { ColorEnum } from "@/enum/enum";

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
                ? "gradient-white text-primary border border-primary"
                : color === ColorEnum.SECONDARY
                ? "gradient-secondary text-white border border-secondary"
                : color === ColorEnum.WARNING
                ? "gradient-warning text-white border border-warning"
                : color === ColorEnum.FAILURE
                ? "gradient-white text-failure border border-failure"
                : color === ColorEnum.SUCCESS
                ? "gradient-success text-white border border-success"
                : ""
            }`
          : ""
      } flex-1 font-bold flex justify-center items-center p-2 rounded-md w-full h-full`}
      type={type}
      onClick={onClick}
    >
      {icon && (
        <div className="flex justify-center items-center text-white mr-2">
          {icon}
        </div>
      )}
      <p className="text-base">{text}</p>
    </button>
  );
};

export default CustomButton;
