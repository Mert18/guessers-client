import React from "react";
import EventCard from "./EventCard";

const ActiveEvents = ({ events, handleOptionSelected, owner, roomId, betSlip }) => {
  return (
    <div className="flex flex-wrap justify-start items-start">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          handleOptionSelected={handleOptionSelected}
          owner={owner}
          roomId={roomId}
          betSlip={betSlip}
        />
      ))}
    </div>
  );
};

export default ActiveEvents;
