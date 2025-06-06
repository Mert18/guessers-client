import React from "react";
import ComponentTitle from "../common/ComponentTitle";
import Image from "next/image";
import PickOneAndHopeInit from "../games/pickoneandhope/PickOneAndHopeInit";

const PublicGames = () => {
  return (
    <div>
      <ComponentTitle
        text="Public Games"
        icon={
          <Image src={"/icons/gaming.svg"} width={20} height={20} alt="door" />
        }
      />

      <div>
        <PickOneAndHopeInit />
      </div>
    </div>
  );
};

export default PublicGames;
