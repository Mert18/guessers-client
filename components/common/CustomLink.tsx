import { ColorEnum } from "@/enum/enum";
import Link from "next/link";
import React from "react";

interface ICustomLink {
  text: string;
  href: string;
  icon?: React.ReactNode;
  bg?: boolean;
  color?: ColorEnum;
}

const CustomLink = ({ href, bg, icon, text, color = ColorEnum.PRIMARY }: ICustomLink) => {
  return (
    <Link href={href} className="flex-1 text-center">
      <div
        className={`font-bold flex justify-center h-full p-2 rounded-md
          ${
            bg
              ? `${
                  color === ColorEnum.PRIMARY
                    ? "gradient-primary"
                    : color === ColorEnum.SECONDARY
                    ? "gradient-secondary"
                    : color === ColorEnum.WARNING
                    ? "gradient-warning"
                    : color === ColorEnum.FAILURE
                    ? "gradient-failure"
                    : color === ColorEnum.SUCCESS
                    ? "gradient-success"
                    : ""
                } text-white`
              : `bg-transparent text-primary`
          }`}
      >
        {icon && (
          <div className="flex justify-center items-center text-white mr-2">
            {icon}
          </div>
        )}
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default CustomLink;
