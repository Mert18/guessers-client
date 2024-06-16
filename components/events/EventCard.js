"use client";
import { startEvent } from "@/api/event";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const EventCard = ({ event, handleOptionSelected, owner, roomId }) => {
  const [optionsVisible, setOptionsVisible] = useState(false);

  return (
    <div
      key={event.id}
      className={`flex flex-col justify-center items-center w-96 min-h-48 my-2 text-background ${event.status === "IN_PROGRESS" ? "bg-quaternary-darker" : "bg-primary"}`}
    >
      <div className="w-full">
        {owner && (
          <div className="flex justify-end w-full">
            <button className="p-1 block" onClick={() => {
              startEvent(event.id);
            }}>
              <Image src="/stop.svg" alt="Stop Event" width={18} height={18} />
            </button>
            <Link
              href={`/room/${roomId}/event/${event.id}/finalize`}
              className="p-1 block"
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

      <div>
        <p className="p-2">{event.name}</p>
        <p className="p-2">{event.description}</p>
      </div>
      <div className={`p-2 w-full flex justify-center items-center hover:cursor-pointer ${event.status === "IN_PROGRESS" ? 'hidden': ''}`} onClick={() => {
        setOptionsVisible(!optionsVisible);
      }}>
        <Image className={`${optionsVisible ? 'rotate-180': ''} transition-all`} src="/arrow.svg" alt="Arrow" width={14} height={14} />
      </div>
      <div className="w-full">
        {optionsVisible && (
          <div className="flex flex-col items-center w-full">
            {event.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelected(event, option)}
                className="flex-1 flex-col justify-center items-center w-full "
              >
                <p>{option.name}</p>
                <p className="font-bold">{option.odds}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
