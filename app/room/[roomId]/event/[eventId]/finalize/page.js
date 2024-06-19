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

  const handleChangeWinningOptions = (option) => {
    if (winningOptions.includes(option)) {
      setWinningOptions(
        winningOptions.filter((winningOption) => winningOption !== option)
      );
    } else {
      setWinningOptions([...winningOptions, option]);
    }
  };

  const handleFinalize = () => {
    const winningOptionNumbers = winningOptions.map((option) => option.optionNumber);
    finalizeEvent({ eventId: params.eventId, roomId: params.roomId, winnerOptionNumbers: winningOptionNumbers }).finally(() => {
      setTimeout(() => {
        window.location.href = `/room/${params.roomId}`;
      }, 3000)
    })
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-primary text-2xl font-bold text-center">
        Finalize Event
      </div>
      <div className="w-1/3">
      <h1 className="font-bold text-xl">{event?.name}</h1>
      <p>Select the winning options.</p>
      {event?.options?.map((option) => (
        <div
          key={option.optionNumber}
          onClick={() => handleChangeWinningOptions(option)}
          style={
            winningOptions.includes(option) ? { backgroundColor: "#A1C398" } : {}
          }
          className="p-2 cursor-pointer"
        >
          <p>
            {option.name}
          </p>
        </div>
      ))}
      </div>

      <button className="p-2 mr-2 bg-primary text-background font-bold hover:bg-primary-brighter" onClick={() => handleFinalize()}>Finalize</button>
    </div>
  );
};

export default EventFinalize;
