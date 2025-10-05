import React from "react";
import { ColorEnum } from "@/enum/enum";
import CustomLink from "@/components/common/CustomLink";

const PickOneAndHopeInit = () => {
  return (
    <li className="rounded-md w-48 h-48 p-2 border border-primary bg-gradient-white text-primary text-center flex flex-col justify-around items-center">
      <h1 className="font-semibold tracking-wide group-hover:scale-105 transition-transform">
        🎲 Pick One & Hope
      </h1>

      <div className="text-sm text-primary mt-2 text-center">
        A quick luck-based game. Try your chance!
      </div>

      <div className="w-full">
        <CustomLink
          href="/home/publicgames/pickoneandhope"
          color={ColorEnum.PRIMARY}
          text="Play"
          bg={true}
        />
      </div>
    </li>
  );
};

export default PickOneAndHopeInit;
