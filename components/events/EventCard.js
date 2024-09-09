"use client";
import React, { useState } from "react";
import { startEvent } from "@/api/event";
import EventGuessOptions from "./EventGuessOptions";
import EventCardHeader from "./EventCardHeader";

const EventCard = ({ event, handleOptionSelected, guesses, roomUser }) => {
  const [optionsOpen, setOptionsOpen] = useState(true);

  const handleStartEvent = (event) => {
    startEvent(event.id, roomUser.room.id).finally(() => {
      window.location.reload();
    })
  };

  return (
    <div
      key={event.id}
      className={`flex flex-col justify-center items-center w-full rounder-md text-primary text-xs border border-primary p-2 my-2`}
    >
      <EventCardHeader
        event={event}
        optionsOpen={optionsOpen}
        setOptionsOpen={setOptionsOpen}
        handleStartEvent={handleStartEvent}
        roomUser={roomUser}
      />
      
      {event.status === "IN_PROGRESS" && optionsOpen && (
        <EventGuessOptions
          event={event}
          eventGuessOptions={event.eventGuessOptions}
          handleOptionSelected={handleOptionSelected}
          guesses={guesses}
        />
      )}
    </div>
  );
};

export default EventCard;
