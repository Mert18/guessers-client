import React from "react";
import CustomButton from "../../common/CustomButton";
import GameWrapper from "../GameWrapper";
import PickOneAndHope from "./PickOneAndHope";

const PickOneAndHopeInit = () => {
  const [pickOneAndHopeOpen, setPickOneAndHopeOpen] = React.useState(false);
  const handlePlayPickOneAndHope = () => {
    setPickOneAndHopeOpen(true);
  };

  return (
    <div className="mx-1 rounded-md bg-transparent w-48 h-48 p-2 text-primary border-2 border-primary text-center text-3xl flex flex-col justify-around items-center">
      <h1>Pick One and Hope</h1>
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
    </div>
  );
};

export default PickOneAndHopeInit;
