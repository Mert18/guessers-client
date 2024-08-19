import React from "react";

const EventGuessOptionCase = ({
  event,
  eventGuessOption,
  eventGuessOptionCase,
  handleOptionSelected,
  guesses,
}) => {
  return (
    <div
      key={eventGuessOptionCase.id}
      className="flex-1 flex flex-col justify-center items-center hover:cursor-pointer"
      onClick={() => {
        handleOptionSelected(event, eventGuessOption, eventGuessOptionCase);
      }}
    >
      <div className="text-text w-full p-2 flex justify-center items-center border-b border-secondary">
        <p>{eventGuessOptionCase.name}</p>
      </div>
      <div
        className={`${
          guesses.findIndex(
            (guess) => guess.eventGuessOptionCaseId === eventGuessOptionCase.id
          ) >= 0
            ? "bg-primary text-background"
            : "text-text bg-background2"
        } w-full p-2 flex justify-center items-center`}
      >
        <p>{eventGuessOptionCase.odds}</p>
      </div>
    </div>
  );
};

export default EventGuessOptionCase;