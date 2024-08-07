"use client";
import React, { useState } from "react";

const EventCard = ({
  event,
  handleOptionSelected,
  guesses,
}) => {
  return (
    <div
      key={event.id}
      className={`flex flex-col justify-center items-center w-full m-2 rounder-md text-primary border border-background3 rounded-md`}
    >
      <div className="flex justify-between items-center w-full">
        <p className="p-2">{event.name}</p>
        <p className="p-2">{event.description}</p>
        <div>
          
        </div>
      </div>
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
                          );
                        }}
                      >
                        <div className="bg-background2 text-text w-full p-2 flex justify-center items-center rounded-md m-1">
                          <p>{eventGuessOptionCase.name}</p>
                        </div>
                        <div
                          className={`${
                            guesses.findIndex(
                              (guess) =>
                                guess.eventGuessOptionCaseId ===
                                eventGuessOptionCase.id
                            ) >= 0
                              ? "bg-primary text-background"
                              : "bg-background3 text-text"
                          } w-full p-2 flex justify-center items-center rounded-md m-1`}
                        >
                          <p>{eventGuessOptionCase.odds}</p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
