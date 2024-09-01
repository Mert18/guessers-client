import React from "react";

const GuessPaperGuess = ({ guess }) => {
  return (
    <div
      className="flex w-full border-b border-primary"
    >
      <p className="flex-1">{guess.event.name}</p>
      <p className="flex-1">{guess.eventGuessOption.name}</p>
      <p className="flex-1">{guess.eventGuessOptionCase.name}</p>
      <p className="flex-1">{guess.eventGuessOptionCase.odds}</p>
      <p className="flex-1">{guess.eventGuessOptionCase.status}</p>
    </div>
  );
};

export default GuessPaperGuess;
