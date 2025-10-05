import React from "react";
import ComponentTitle from "../common/ComponentTitle";
import Image from "next/image";
import PickOneAndHopeCard from "../games/pickoneandhope/PickOneAndHopeCard";

const PublicGames = () => {
  return (
    <div>
      <ComponentTitle
        text="Public Games"
        icon={
          <Image src={"/icons/gaming.svg"} width={20} height={20} alt="door" />
        }
      />

      <ul>
        <PickOneAndHopeCard />
      </ul>
    </div>
  );
};

export default PublicGames;
