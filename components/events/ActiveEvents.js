import React from "react";
import EventCard from "./EventCard";

const ActiveEvents = ({ events, handleOptionSelected, owner, roomId }) => {
  return (
    <div className="flex flex-wrap justify-start items-center">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          handleOptionSelected={handleOptionSelected}
          owner={owner}
          roomId={roomId}
        />
      ))}
    </div>
  );
};

export default ActiveEvents;
