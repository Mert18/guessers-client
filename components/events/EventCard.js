"use client";
import React, { useState } from "react";

const EventCard = ({ event, handleOptionSelected, owner, roomId, guesses, setGuesses }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      key={event.id}
      className={`flex flex-col justify-center items-center w-96 min-h-48 my-2 mr-2 rounder-md text-primary ${
        event.status === "IN_PROGRESS"
          ? "bg-quaternary-darker"
          : "bg-background-accent"
      }`}
    >
      <div className="flex flex-col justify-center items-center w-full border-b border-background-accent">
        <p className="p-2">{event.name}</p>
        <p className="p-2">{event.description}</p>
      </div>
      {!collapsed && (
        <div className="w-full flex justify-center items-center text-xs p-2">
          <div className="flex flex-col items-center justify-between w-full">
            {event.eventGuessOptions.map((eventGuessOption) => (
              <div
                key={eventGuessOption.id}
                className="w-full flex flex-col justify-start items-start"
              >
                <p className="text-text text-xs lowercase m-1">
                  {eventGuessOption.name}
                </p>
                <div className="flex w-full">
                  {eventGuessOption.eventGuessOptionCases?.map(
                    (eventGuessOptionCase) => {
                      return (
                        <div
                          key={eventGuessOptionCase.id}
                          className="flex-1 flex flex-col justify-center items-center m-1 hover:cursor-pointer"
                          onClick={() => {
                            handleOptionSelected(
                              event,
                              eventGuessOption,
                              eventGuessOptionCase
                            )
                          }}
                        >
                          <div className="bg-background2 text-text w-full p-2 flex justify-center items-center rounded-md m-1">
                            <p>{eventGuessOptionCase.name}</p>
                          </div>
                          <div className={`${guesses.findIndex((guess) => guess.eventGuessOptionCaseId === eventGuessOptionCase.id) >=0 ? "bg-primary" : "bg-background3"} text-text w-full p-2 flex justify-center items-center rounded-md m-1`}>
                            <p>{eventGuessOptionCase.odds}</p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            ))}
            {/* {event.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelected(event, option)}
                  className={`flex justify-between items-center w-full min-h-32 p-1 
                  ${
                    betSlip?.bets.find(
                      (bet) =>
                        bet.event.id === event.id &&
                        bet.option.optionNumber === option.optionNumber
                    )
                      ? "bg-tertiary-darker"
                      : "even:bg-background-accent bg-background-darker"
                  }`}
                >
                  <p className="text-primary">{option.name}</p>
                  <p className="font-bold p-1 bg-primary rounded-md text-sm text-background">
                    {option.odds.toFixed(2)}
                  </p>
                </button>
              ))} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
