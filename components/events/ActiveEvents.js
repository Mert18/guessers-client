"use client";
import Link from "next/link";
import React from "react";

const ActiveEvents = ({ events, handleOptionSelected, owner, roomId }) => {
  return (
    <div className="flex flex-wrap justify-start items-center">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex flex-col justify-center items-center w-96 h-48 m-4 relative"
        >
          <p className="p-2">{event.name}</p>
          <div className="flex w-full">
            {event.options.slice(0, 3).map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelected(event, option)}
                className="flex-1 flex-col justify-center items-center border border-black"
              >
                <p>{option.name}</p>
                <p className="font-bold">{option.odds}</p>
              </button>
            ))}
          </div>
          {owner && (
            <Link
              href={`/room/${roomId}/event/${event.id}/finalize`}
              className="absolute top-0 right-0"
            >
              Finalize
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActiveEvents;
