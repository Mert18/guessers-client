import React from "react";
import EventGuessOptionCase from "./EventGuessOptionCase";

const EventGuessOption = ({
  event,
  eventGuessOption,
  handleOptionSelected,
  guesses,
}) => {
  return (
    <div
      key={eventGuessOption.id}
      className="w-full flex flex-col justify-start items-start"
    >
      <p className="text-text text-xs lowercase my-1">{eventGuessOption.name}</p>
      {event.status === "IN_PROGRESS" && (
        <div className="w-full grid auto-cols-fr grid-flow-col">
          {eventGuessOption.eventGuessOptionCases?.map(
            (eventGuessOptionCase) => (
              <EventGuessOptionCase
                key={eventGuessOptionCase.id}
                event={event}
                eventGuessOption={eventGuessOption}
                eventGuessOptionCase={eventGuessOptionCase}
                handleOptionSelected={handleOptionSelected}
                guesses={guesses}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default EventGuessOption;
