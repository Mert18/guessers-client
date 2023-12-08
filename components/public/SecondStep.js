"use client";
import React, { useState } from "react";
import FadeInOut from "../common/FadeInOut";

const SecondStep = ({ setCurrentStep, setWantedName }) => {
  const [localWantedName, setLocalWantedName] = useState("");
  const handleSecondStepDone = () => {
    setWantedName(localWantedName);
    setCurrentStep(2);
  };
  return (
    <FadeInOut>
      <div className="flex flex-col justify-center items-center">
        <p>Please enter the name you want.</p>
        <input
          type="text"
          className="border border-gray-400 rounded-md p-2 m-2 text-center"
          onChange={(e) => setLocalWantedName(e.target.value)}
        />
        {/* Add hover effect to my button */}
        <button
          className="border border-gray-400 rounded-md p-2 m-2 text-center hover:bg-gray-200"
          onClick={handleSecondStepDone}
        >
          I am done
        </button>
      </div>
    </FadeInOut>
  );
};

export default SecondStep;
