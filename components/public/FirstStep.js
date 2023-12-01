import React from "react";
import FadeInOut from "../common/FadeInOut";

const FirstStep = ({ setCurrentStep }) => {

  const handleFirstStepDone = () => {
    setCurrentStep(1);
  }
  return (
    <FadeInOut>
      <button onClick={handleFirstStepDone}>Born</button>
    </FadeInOut>
  );
};

export default FirstStep;
