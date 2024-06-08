'use client'
import React from "react";

const ActiveEvents = ({ events, handleOptionSelected }) => {


  return (
    <div className="flex flex-wrap justify-start items-center">
      {events.map((event) => {
        return (
          <div
            key={event.id}
            className="flex flex-col justify-center items-center w-96 h-48 m-4"
          >
            <p className="p-2">
              {new Date(event.date).toLocaleTimeString("tr-TR")}
            </p>
            <p className="p-2">{event.name}</p>
            <div className="flex w-full">
              {event.options.slice(0, 3).map((option) => {
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelected(event, option)}
                    className="flex-1 flex-col justify-center items-center border border-black"
                  >
                    <p>{option.name}</p>
                    <p className="font-bold">{option.odds}</p>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActiveEvents;
