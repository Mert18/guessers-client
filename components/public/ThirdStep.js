"use client";
import React, { useEffect, useState } from "react";
import FadeInOut from "../common/FadeInOut";

const ThirdStep = ({ setCurrentStep, setWantedDollars }) => {
  const [localWantedDollars, setLocalWantedDollars] = useState(0.0);
  const [messageStyle, setMessageStyle] = useState({});
  const [messageVisible, setMessageVisible] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("You are not allowed to choose your name.");
    setMessageStyle({
      opacity: "1",
    });
    setTimeout(() => {
      setMessageStyle({
        opacity: "0",
      });
      setTimeout(() => {
         setMessage("We will choose your name for you.");
         setMessageStyle({
           opacity: "1",
         });
         setTimeout(() => {
            setMessageStyle({
               opacity: "0",
            });
            setTimeout(() => {
               setMessageVisible(false);
            }, 3000)
         }, 3000)
      }, 3000);
    }, 3000);
  }, []);

  const handleThirdStepDone = () => {
    setWantedDollars(localWantedDollars);
    setCurrentStep(3);
  };

  return (
    <FadeInOut>
      {messageVisible ? (
        <h1
          className="transition-all duration-3000 opacity-0"
          style={messageStyle}
        >
          {message}
        </h1>
      ) : (
        <FadeInOut>
          <p>
            Please enter the dollar amount you want. (Does not matter, really.)
          </p>
          <input
            type="number"
            onChange={(e) => setLocalWantedDollars(e.target.value)}
          />
          <button onClick={handleThirdStepDone}>I am done</button>
        </FadeInOut>
      )}
    </FadeInOut>
  );
};

export default ThirdStep;
