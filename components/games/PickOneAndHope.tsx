import React from "react";
import CustomButton from "../common/CustomButton";

const PickOneAndHope = () => {
  const handlePlayPickOneAndHope = () => {
    
  };
  return (
    <div className="mx-1 rounded-md bg-primary-dark w-48 h-48 p-2 text-white text-center text-3xl flex flex-col justify-around items-center">
      <h1>Pick One and Hope</h1>
      <div className="w-full">
        <CustomButton
          type="button"
          text="Play"
          onClick={() => handlePlayPickOneAndHope()}
          bg={true}
        />
      </div>
    </div>
  );
};

export default PickOneAndHope;
