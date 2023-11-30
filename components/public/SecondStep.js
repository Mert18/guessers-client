"use client"
import React, { useState } from 'react'
import FadeInOut from '../common/FadeInOut'

const SecondStep = ({ setCurrentStep, setWantedName }) => {
   const [localWantedName, setLocalWantedName] = useState('')
   const handleSecondStepDone = () => {
      setWantedName(localWantedName)
      setCurrentStep(2)
   }
   return (
      <FadeInOut>
         <p>Please enter the name you want.</p>
         <input type="text" onChange={(e) => setLocalWantedName(e.target.value)} />
         <button onClick={handleSecondStepDone}>I am done</button>
      </FadeInOut>
   )
}

export default SecondStep