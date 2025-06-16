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
                    ? "gradient-white text-primary border border-primary"
                    : color === ColorEnum.SECONDARY
                    ? "gradient-secondary text-white border border-secondary"
                    : color === ColorEnum.WARNING
                    ? "gradient-warning text-white border border-warning"
                    : color === ColorEnum.FAILURE
                    ? "gradient-failure text-white border border-failure"
                    : color === ColorEnum.SUCCESS
                    ? "gradient-success text-white border border-success"
                    : ""
                }`
              : `text-primary underline`
          } `}
      >
        {icon && (
          <div className="flex justify-center items-center mr-2">
            {icon}
          </div>
        )}
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default CustomLink;
