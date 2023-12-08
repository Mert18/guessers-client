"use client";
import React, { useEffect } from "react";
import FadeInOut from "../common/FadeInOut";

const ThirdStep = ({ setCurrentStep }) => {
  const handleThirdStepDone = () => {
    setCurrentStep(3);
  };

  useEffect(() => {
    setTimeout(() => {
      handleThirdStepDone();
    }, 2000)
  }, [])

  return (
    <FadeInOut fadeOut={true}>
      <h1 className="flex flex-col justify-center items-center">
        <p>You cannot choose your name.</p>
        <p>We will choose your name for you.</p>
      </h1>
    </FadeInOut>
  );
};

export default ThirdStep;
