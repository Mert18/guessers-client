"use client"
import React, { useState } from 'react'
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import FadeInOut from '../common/FadeInOut';
import { createUser } from '@/api/public';

const Midwife = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [createdUser, setCreatedUser] = useState({});

  const stepHelper = () => {
    switch (currentStep) {
      case 0:
        return <FirstStep handleCreateUser={handleCreateUser} />;
      case 1:
        return <SecondStep createdUser={createdUser} />;
    }
  }

  const handleCreateUser = () => {
    createUser("a", 1).then((response) => {
      setCreatedUser(response.data.user);
      setCurrentStep(1);
    })
  }

  return (
    <FadeInOut>
      {stepHelper()}
    </FadeInOut>
  )
}

export default Midwife