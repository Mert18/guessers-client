"use client"
import React, { useEffect, useState } from 'react'
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import ForthStep from './ForthStep';
import FadeInOut from '../common/FadeInOut';
import FifthStep from './FifthStep';
import SixthStep from './SixthStep';
import { createUser, publicApi } from '@/api/public';

const Midwife = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [wantedName, setWantedName] = useState('')
  const [wantedDollars, setWantedDollars] = useState(0.00)
  const [generatedUser, setGeneratedUser] = useState({})
  const [createdUser, setCreatedUser] = useState({});

  const stepHelper = () => {
    switch (currentStep) {
      case 0:
        return <FirstStep setCurrentStep={setCurrentStep} />;
      case 1:
        return <SecondStep setCurrentStep={setCurrentStep} setWantedName={setWantedName} />;
      case 2:
        return <ThirdStep setCurrentStep={setCurrentStep}  />;
      case 3:
        return <ForthStep setCurrentStep={setCurrentStep} setWantedDollars={setWantedDollars} />;
      case 4:
        return <FifthStep setCurrentStep={setCurrentStep} handleCreateUser={handleCreateUser} />;
      case 5:
        return <SixthStep createdUser={createdUser} />;
      default:
        return <FirstStep setCurrentStep={setCurrentStep} />;
    }
  }

  const handleCreateUser = () => {
    createUser(wantedName, wantedDollars).then((response) => {
      setCreatedUser(response.data.user);
    })
  }

  return (
    <FadeInOut>
      {stepHelper()}
    </FadeInOut>
  )
}

export default Midwife