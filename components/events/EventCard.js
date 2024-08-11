"use client";
import React, { useState } from "react";
import PrimaryButton from "../common/button/PrimaryButton";

const EventCard = ({
  event,
  handleOptionSelected,
  guesses,
  roomUser,
  status,
}) => {
  console.log("EventCard", event);
  const handleStopGuessing = (event) => {
    console.log("Stop Guessing", event);
  };
  return (
    <div
      key={event.id}
      className={`flex flex-col justify-center items-center w-full m-2 rounder-md text-primary border border-background3 rounded-md`}
    >
      <div className="flex justify-between items-center w-full p-4">
        <p className="font-bold">{event.name}</p>

        {roomUser.owner && status === "IN_PROGRESS" && (
          <div className="flex">
            <PrimaryButton
              text="Finalize Event"
              href={`/home/room/${roomUser.room.id}/event/${event.id}/finalize`}
              noBg={true}
            />
            <PrimaryButton
              text="Stop Guessing"
              onClick={() => handleStopGuessing(event)}
              noBg={true}
            />
          </div>
        )}

        <p>{event.description}</p>
      </div>
      {status === "IN_PROGRESS" && (
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
                            } w-full p-2 flex justify-center items-center`}
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
      )}
    </div>
  );
};

export default EventCard;
