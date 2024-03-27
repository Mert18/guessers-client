import React from "react";
import FadeInOut from "../common/FadeInOut";

const FirstStep = ({ handleCreateUser }) => {

  const handleFirstStepDone = () => {
    handleCreateUser();
  }

  return (
    <FadeInOut>
      <button onClick={handleFirstStepDone}>Born</button>
    </FadeInOut>
  );
};

export default FirstStep;
 