import React from "react";
import Image from "next/image";
import SecondaryButton from "../common/button/SecondaryButton";

const EventCardHeader = ({
  event,
  optionsOpen,
  setOptionsOpen,
  handleStartEvent,
  roomUser,
}) => {
  function convertToUserTimeZone(utcDateTimeString) {
    const utcDate = new Date(utcDateTimeString); // Parse the UTC string
    return utcDate.toLocaleString("en-US", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  }

  return (
    <div
      className={`flex flex-col justify-between items-center w-full font-bold border-b border-primary`}
    >
      <div
        className={`flex justify-between items-center w-full ${event.status === "IN_PROGRESS" ? "cursor-pointer" : "text-text"}`}
        onClick={() => {
          if (event.status === "IN_PROGRESS") {
            setOptionsOpen(!optionsOpen);
          }
        }}
      >
        <p className={`flex-1`}>{event.name}</p>

        {roomUser.owner && (
          <div className="flex flex-1">
            {event.status === "IN_PROGRESS" ? (
              <SecondaryButton
                text="Start Event"
                onClick={() => handleStartEvent(event)}
                
              />
            ) : (
              event.status === "STARTED" && (
                <SecondaryButton
                  text="Finalize Event"
                  href={`/home/room/${roomUser.room.id}/event/${event.id}/finalize`}
                  
                />
              )
            )}
          </div>
        )}

        <p className="flex-1">{convertToUserTimeZone(event.eventTime)}</p>
        {event.status === "IN_PROGRESS" && (
          <div className={`mr-2 ${optionsOpen ? "rotate-180" : ""}`}>
            <Image src="/arrow.svg" alt="arrow" width={10} height={10} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCardHeader;
