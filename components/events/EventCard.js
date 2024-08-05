"use client";
import { startEvent } from "@/api/event";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EventCard = ({ event, handleOptionSelected, owner, roomId, betSlip }) => {
  return (
    <div
      key={event.id}
      className={`flex flex-col justify-center items-center w-96 min-h-48 my-2 mr-2 rounder-md text-primary ${event.status === "IN_PROGRESS" ? "bg-quaternary-darker" : "bg-background-accent"}`}
    >
      <div className="w-full">
        {owner && (
          <div className="flex justify-end w-full p-2">
            <button className="p-1" onClick={() => {
              startEvent(event.id);
            }}>
              <Image src="/stop.svg" alt="Stop Event" width={18} height={18} />
            </button>
            <Link
              href={`/home/room/${roomId}/event/${event.id}/finalize`}
              className="p-1"
            >
              <Image
                src="/finish.svg"
                alt="Finish Event"
                width={18}
                height={18}
              />
            </Link>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center items-center w-full border-b border-background-accent">
        <p className="p-2">{event.name}</p>
        <p className="p-2">{event.description}</p>
      </div>
      <div className="w-full flex justify-center items-center text-xs p-2">
        {event.status === "IN_PROGRESS" ? "EVENT IN PROGRESS" : (
          <div className="flex flex-col items-center justify-between w-full">
            {event.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelected(event, option)}
                className={`flex justify-between items-center w-full min-h-32 p-1 
                  ${betSlip?.bets.find((bet) => bet.event.id === event.id && bet.option.optionNumber === option.optionNumber) ? "bg-tertiary-darker" : "even:bg-background-accent bg-background-darker"}`}
              >
                <p className="text-primary">{option.name}</p>
                <p className="font-bold p-1 bg-primary rounded-md text-sm text-background">{option.odds.toFixed(2)}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
