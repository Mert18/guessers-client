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
    finalizeEvent({ eventId: params.eventId, roomId: params.roomId, winnerOptionNumbers: winningOptionNumbers });
  }
  return (
    <div>
      {event?.options?.map((option) => (
        <div
          key={option.optionNumber}
          onClick={() => handleChangeWinningOptions(option)}
          style={
            winningOptions.includes(option) ? { backgroundColor: "green" } : {}
          }
        >
          <p>
            {option.name} ---- {option.optionNumber}
          </p>
        </div>
      ))}

      <button onClick={() => handleFinalize()}>Finalize</button>
    </div>
  );
};

export default EventFinalize;
