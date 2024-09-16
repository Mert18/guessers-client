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
      <div className="text-text w-full flex justify-center items-center border-b border-primary_accent py-2">
        <p className="truncate">{eventGuessOptionCase.name}</p>
      </div>
      <div
        className={`${
          guesses.findIndex(
            (guess) => guess.eventGuessOptionCaseId === eventGuessOptionCase.id
          ) >= 0
            ? "bg-primary text-background"
            : "text-primary bg-background"
        } w-full py-2 m-1 flex justify-evenly items-center font-bold`}
      >
        <p>{eventGuessOptionCase.odds}</p>
      </div>
    </div>
  );
};

export default EventGuessOptionCase;
