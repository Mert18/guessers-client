import React from "react";
import FadeInOut from "../common/FadeInOut";

const FirstStep = ({ setCurrentStep }) => {
  return (
    <FadeInOut>
      <button onClick={() => setCurrentStep(1)}>Born</button>
    </FadeInOut>
  );
};

export default FirstStep;
