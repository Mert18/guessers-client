"use client";
import { useState } from "react";
import { startEvent } from "@/api/event";
import EventGuessOptions from "./EventGuessOptions";
import EventCardHeader from "./EventCardHeader";
import { IEvent } from "@/types/IEvent.model";
import { ICreateGuessPaperGuess, IHandleOptionSelected } from "@/types/IGuessPaper.model";
import { IRoomUser } from "@/types/IRoom.model";

interface IEventCardProps {
  event: IEvent;
  handleOptionSelected: ({ event, eventGuessOption, eventGuessOptionCase}: IHandleOptionSelected) => void;
  guesses: ICreateGuessPaperGuess[];
  roomUser: IRoomUser;
}

const EventCard = ({ event, handleOptionSelected, guesses, roomUser }: IEventCardProps) => {
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);

  const handleStartEvent = (event: IEvent) => {
    startEvent({eventId: event.id, roomId: roomUser.room.id}).finally(() => {
      window.location.reload();
    })
  };

  return (
    <div
      key={event.id}
      className={`flex flex-col justify-center items-center w-full text-primary text-xs my-2 py-2 bg-backgroundhover border border-primary90 rounded-md`}
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
