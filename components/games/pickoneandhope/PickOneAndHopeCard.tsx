import React from "react";
import CustomButton from "../../common/CustomButton";
import PickOneAndHope from "./PickOneAndHope";

const PickOneAndHopeInit = () => {
  const [pickOneAndHopeOpen, setPickOneAndHopeOpen] = React.useState(false);
  const handlePlayPickOneAndHope = () => {
    setPickOneAndHopeOpen(true);
  };

  return (
    <li className="mx-1 rounded-md bg-transparent w-48 h-48 p-2 text-primary text-center text-3xl flex flex-col justify-around items-center">
      <h1 className="text-lg font-semibold tracking-wide group-hover:scale-105 transition-transform">
        🎲 Pick One & Hope
      </h1>

      <div className="text-sm text-primary mt-2 text-center">
        A quick luck-based game. Try your chance!
      </div>

      <div className="w-full">
        <CustomButton
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
