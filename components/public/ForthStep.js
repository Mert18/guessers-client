import React, { useState } from "react";
import FadeInOut from "../common/FadeInOut";

const ForthStep = ({ setCurrentStep, setWantedDollars }) => {
  const [localWantedDollars, setLocalWantedDollars] = useState(0.0);

  const handleForthStepDone = () => {
    setWantedDollars(localWantedDollars);
    setCurrentStep(4);
  };

  return (
    <FadeInOut>
      <div className="flex flex-col justify-center items-center">
        <p>
          Please enter the dollar amount you want. (Does not matter, really.)
        </p>
        <input
          type="number"
          className="border border-gray-400 rounded-md p-2 m-2 text-center"
          onChange={(e) => setLocalWantedDollars(e.target.value)}
        />
        <button
          onClick={handleForthStepDone}
          className="border border-gray-400 rounded-md p-2 m-2 text-center hover:bg-gray-200"
        >
          I am done
        </button>
      </div>
    </FadeInOut>
  );
};

export default ForthStep;
