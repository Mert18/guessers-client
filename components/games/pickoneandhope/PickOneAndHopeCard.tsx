import React from "react";
import CustomButton from "../../common/CustomButton";
import PickOneAndHope from "./PickOneAndHope";
import { ColorEnum } from "@/enum/enum";

const PickOneAndHopeInit = () => {
  const [pickOneAndHopeOpen, setPickOneAndHopeOpen] = React.useState(false);
  const handlePlayPickOneAndHope = () => {
    setPickOneAndHopeOpen(true);
  };

  return (
    <li className="mx-1 rounded-md w-48 h-48 p-2 border border-primary bg-white-dark text-primary text-center flex flex-col justify-around items-center">
      <h1 className="font-semibold tracking-wide group-hover:scale-105 transition-transform">
        🎲 Pick One & Hope
      </h1>

      <div className="text-sm text-primary mt-2 text-center">
        A quick luck-based game. Try your chance!
      </div>

      <div className="w-full">
        <CustomButton
          color={ColorEnum.PRIMARY}
          type="button"
          text="Play"
          onClick={() => handlePlayPickOneAndHope()}
          bg={true}
        />
      </div>

      {pickOneAndHopeOpen && (
        <PickOneAndHope onClose={() => setPickOneAndHopeOpen(false)} />
      )}
    </li>
  );
};

export default PickOneAndHopeInit;
