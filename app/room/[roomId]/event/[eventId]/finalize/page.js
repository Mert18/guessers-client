"use client";
import { finalizeEvent, getEvent } from "@/api/event";
import React, { useEffect, useState } from "react";

const EventFinalize = ({ params }) => {
  const [event, setEvent] = useState({});
  const [winningOptions, setWinningOptions] = useState([]);
  console.log("params.eventId: ", params.eventId);
  console.log("params.roomId: ", params.roomId);

  useEffect(() => {
    getEvent(params.eventId).then((response) => {
      console.log("Event: ", response.data);
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
    finalizeEvent({ eventId: params.eventId, roomId: params.roomId, winnerOptionNumbers: winningOptionNumbers }).then((response) => {
      console.log("Finalize Response: ", response.data);
    });
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
