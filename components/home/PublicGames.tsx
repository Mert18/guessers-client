import React from "react";
import ComponentTitle from "../common/ComponentTitle";
import Image from "next/image";
import PickOneAndHope from "../games/PickOneAndHope";

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
        <PickOneAndHope />
      </div>
    </div>
  );
};

export default PublicGames;
