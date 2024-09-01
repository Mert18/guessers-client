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
    <div className={`flex flex-col justify-between items-center w-full font-bold`}>
      <div className="flex justify-between items-center w-full">
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

      {event.status === "IN_PROGRESS" && (
        <button
          onClick={() => {
            setOptionsOpen(!optionsOpen);
          }}
        >
          <Image
            className={`${optionsOpen ? "rotate-180" : ""} transition-all p-1`}
            src="/arrow.svg"
            width={20}
            height={20}
            alt="arrow"
          />
        </button>
      )}
    </div>
  );
};

export default EventCardHeader;
