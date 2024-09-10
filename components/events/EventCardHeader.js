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
  return (
    <div className={`flex flex-col justify-between items-center w-full font-bold border-b border-primary`}>
      <div className="flex justify-between items-center w-full cursor-pointer" onClick={() => {
        if(event.status === "IN_PROGRESS") {
          setOptionsOpen(!optionsOpen);
        }
      }}>
        <p>{event.name}</p>

        {roomUser.owner && (
          <div className="flex">
            {event.status === "IN_PROGRESS" ? (
              <SecondaryButton
                text="Start Event"
                onClick={() => handleStartEvent(event)}
                noBg={true}
              />
            ) : (
              event.status === "STARTED" && (
                <SecondaryButton
                  text="Finalize Event"
                  href={`/home/room/${roomUser.room.id}/event/${event.id}/finalize`}
                  noBg={true}
                />
              )
            )}
          </div>
        )}

        <p>{new Date(event.createdOn).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default EventCardHeader;
