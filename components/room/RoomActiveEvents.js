'use client'
import React, { useState } from 'react'
import EventCard from '../events/EventCard'

const RoomActiveEvents = ({activeEvents, roomId}) => {
  const [guessSlip, setGuessSlip] = useState({
    guesses: [],
    stake: 100,
    totalOdds: 1,
    wins: 100,
  });

  console.log("Active events: ", activeEvents)

  const handleOptionSelected = (event, eventGuessOption, eventGuessOptionCase) => {
    console.log("Event: ", event)
    console.log("Event guess option: ", eventGuessOption)
    console.log("Event guess option case: ", eventGuessOptionCase)
    const eventIndex = guessSlip?.guesses.findIndex((guess) => guess.event.id === event.id);
    if(eventIndex) {
      const eventGuessOptionIndex = guessSlip?.guesses[eventIndex].eventGuessOptions.findIndex((guessOption) => guessOption.id === eventGuessOption.id);
      if(eventGuessOptionIndex) {
        const eventGuessOptionCaseIndex = guessSlip?.guesses[eventIndex].eventGuessOptions[eventGuessOption].eventGuessOptionCases.findIndex((guessOptionCase) => guessOptionCase.id === eventGuessOptionCase.id);
        if(eventGuessOptionCaseIndex) {
          const newGuessSlip = [...guessSlip?.guesses];
          newGuessSlip[eventIndex].eventGuessOptions[eventGuessOption].eventGuessOptionCases[eventGuessOptionCase] = eventGuessOptionCase;
          setGuessSlip((prevState) => ({
            ...prevState,
            guesses: newGuessSlip,
          }));
        } else {
          const newGuessSlip = [...guessSlip?.guesses];
          newGuessSlip[eventIndex].eventGuessOptions[eventGuessOption].eventGuessOptionCases.push(eventGuessOptionCase);
          setGuessSlip((prevState) => ({
            ...prevState,
            guesses: newGuessSlip,
          }));
        }
      }
    }
  }

  const owner = false;

  return (
    <div className='flex flex-col justify-center items-center'>
      {activeEvents.map((event) => (
        <EventCard key={event.id} event={event} handleOptionSelected={handleOptionSelected} owner={owner} roomId={roomId} betSlip={betSlip} />
      ))}
    </div>
  )
}

export default RoomActiveEvents