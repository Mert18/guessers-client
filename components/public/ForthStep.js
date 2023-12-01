import React, { useState } from 'react'
import FadeInOut from '../common/FadeInOut'

const ForthStep = ({ setCurrentStep, setWantedDollars }) => {
  const [localWantedDollars, setLocalWantedDollars] = useState(0.0);
  
  const handleForthStepDone = () => {
    setWantedDollars(localWantedDollars);
    setCurrentStep(4);
  }

  return (
    <FadeInOut>
      <p>
        Please enter the dollar amount you want. (Does not matter, really.)
      </p>
      <input
        type="number"
        onChange={(e) => setLocalWantedDollars(e.target.value)}
      />
      <button onClick={handleForthStepDone}>I am done</button>
    </FadeInOut>
  )
}

export default ForthStep