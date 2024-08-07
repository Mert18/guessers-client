"use client";
import { finalizeEvent, getEvent } from "@/api/event";
import React, { useEffect, useState } from "react";

const EventFinalize = ({ params }) => {
  const [event, setEvent] = useState({});
  const [winningOptions, setWinningOptions] = useState([]);

  useEffect(() => {
    getEvent(params.eventId).then((response) => {
      setEvent(response.data);
    });
  }, []);

  const handleChangeWinningOptions = (eventGuessOptionCase) => {
    if (winningOptions.includes(eventGuessOptionCase)) {
      setWinningOptions(
        winningOptions.filter((winningOption) => winningOption !== eventGuessOptionCase)
      );
    } else {
      setWinningOptions([...winningOptions, eventGuessOptionCase]);
    }
  };

  const handleFinalize = () => {
    console.log("Finalize Event: ", winningOptions);
    const winningCaseIds = winningOptions.map((winningOption) => winningOption.id);
    const finalizeRequest = {
      winnerEventGuessOptionCases: winningCaseIds
    }
    finalizeEvent(finalizeRequest, event.id).then((response) => {
      console.log("Finalize Event Response: ", response);
    })
  };
  return (
    <div className="flex flex-col justify-center items-center w-1/2 text-text">
      <div className="text-primary text-2xl font-bold text-center">
        Finalize Event
      </div>
      <div className="">
        <h1 className="font-bold text-xl">{event?.name}</h1>
        <p>Select the winning options.</p>

        {event.eventGuessOptions?.map((eventGuessOption) => (
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
                    onClick={() => handleChangeWinningOptions(eventGuessOptionCase)}
                    >
                       <div className="bg-background2 text-text w-full p-2 flex justify-center items-center rounded-md m-1">
                          <p>{eventGuessOptionCase.name}</p>
                        </div>
                        <div
                          className={`${
                            winningOptions.includes(eventGuessOptionCase)
                              ? "bg-success"
                              : "bg-background3"
                          } w-full p-2 flex justify-center items-center rounded-md m-1 text-text`}
                        >
                          <p>{eventGuessOptionCase.odds}</p>
                        </div>
                      </div>
                  )
                }
              )}
                </div>

          </div>
          ))}
      </div>

      <button
        className="p-2 mr-2 bg-primary text-background font-bold hover:bg-primary-brighter"
        onClick={() => handleFinalize()}
      >
        Finalize
      </button>
    </div>
  );
};

export default EventFinalize;
