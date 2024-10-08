import React from "react";
import EventGuessOption from "./EventGuessOption";

const EventGuessOptions = ({
  event,
  eventGuessOptions,
  handleOptionSelected,
  guesses,
}) => {
  return (
    <div className="w-full grid grid-cols-1 gap-5">
      {eventGuessOptions.map((eventGuessOption) => (
        <EventGuessOption key={eventGuessOption.id} event={event} eventGuessOption={eventGuessOption} handleOptionSelected={handleOptionSelected} guesses={guesses} />
      ))}
    </div>
  );
};

export default EventGuessOptions;
